import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from "react";
import { SCENARIOS } from "../scenarios";
import type { Scenario, Vec2 } from "../scenarios/types";
import { useGame, type SelectionKind } from "../state/store";
import { CENTER_LINE_ID, PLAYER_ID, type Route } from "../scenarios/types";
import { isSceneQuestion, useCurrentQuestion } from "../state/store";
import { CarFigure, DecorFigure, PedestrianFigure, SignFigure, vehicleTopHeight } from "./Figures";
import { RouteArrow } from "./RouteArrow";
import { CenterLine, Grid, MainRoad, Markings, RoadFeatures } from "./Ground";
import { GROUND_MATRIX, P, depth } from "./iso";
import { PLAYER_U, ROAD_EXTENT, SCENARIO_HALF } from "./road";

/** Hvor langt veien ruller under bilen ved «Videre» (delelig med midtlinjens 12 m-periode). */
export const CONVEYOR_DISTANCE = SCENARIO_HALF * 2;
const CONVEYOR_MS = 2600;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const MIN_ZOOM = 5;
const MAX_ZOOM = 40;
/** Maks panorering bort fra fokuspunktet, i meter (skjermprojisert). */
const MAX_PAN_M = 45;
const CLICK_TOLERANCE = 6;
const FOCUS_MS = 700;

const PLAYER_COLOR = "#5ad1ff";
const DEFAULT_COLOR = "#ffd166";
const PED_COLOR = "#f4a7ff";

const POI_RADIUS: Record<SelectionKind, number> = { sign: 1.5, vehicle: 3.4, pedestrian: 1.2 };

/** Kjører transportbåndet: oppdaterer fremdrift hver frame til overgangen er ferdig. */
function useConveyor() {
  const next = useGame((s) => s.next);
  useEffect(() => {
    if (next === null) return;
    const { setProgress, finishTransition } = useGame.getState();
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / CONVEYOR_MS);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
      else finishTransition();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [next]);
}

type View = { x: number; y: number; zoom: number };

/** Standard punkt på bakken [u, v] som midtstilles: litt foran bilen, der det skjer. */
export const DEFAULT_FOCUS: Vec2 = [0, 17];

/** Panorering (dra), zoom (hjul / to fingre) med grenser. Skjerm = view.xy + zoom × P(u, v). */
function usePanZoom(
  size: { w: number; h: number },
  focus: { token: number; points: Vec2[] },
  /** Scenarioets hjemmepunkt på bakken. */
  homeFocus: Vec2,
) {
  const [view, setView] = useState<View>({ x: 0, y: 0, zoom: 12 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const anim = useRef(0);
  const home = useRef<View>(view);
  const pointers = useRef(new Map<number, Vec2>());
  const dragged = useRef(false);
  const downAt = useRef<Vec2>([0, 0]);
  const resetToken = useGame((s) => s.viewResetToken);

  /**
   * Skjermpunktet som er «midten» av det synlige tegnebrettet. Spørsmålspanelet
   * ligger til venstre på brede skjermer og nederst på smale.
   */
  const stageCenter = (): Vec2 => (size.w > 900 ? [(size.w + 420) / 2, size.h / 2] : [size.w / 2, size.h * 0.3]);

  /** Fri flate over spørsmålspanelet på smale skjermer (panelet vokser når forklaringen vises). */
  const narrowStage = () => {
    const top = document.querySelector(".question")?.getBoundingClientRect().top ?? size.h * 0.55;
    const hudBottom = 70;
    return { cy: (hudBottom + top) / 2, height: Math.max(80, top - hudBottom) };
  };

  const homeView = (): View => {
    const wide = size.w > 900;
    const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, wide ? Math.min((size.w - 420) / 62, size.h / 46) : size.w / 58));
    const [fx, fy] = P(homeFocus[0], homeFocus[1]);
    const [sx, sy] = stageCenter();
    return { zoom, x: sx - zoom * fx, y: sy - zoom * fy };
  };

  /** Myk overgang fra nåværende utsnitt til `to`. */
  const animateTo = (to: View) => {
    cancelAnimationFrame(anim.current);
    const from = viewRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / FOCUS_MS);
      const k = easeInOut(t);
      setView({
        zoom: from.zoom + (to.zoom - from.zoom) * k,
        x: from.x + (to.x - from.x) * k,
        y: from.y + (to.y - from.y) * k,
      });
      if (t < 1) anim.current = requestAnimationFrame(tick);
    };
    anim.current = requestAnimationFrame(tick);
  };

  useLayoutEffect(() => {
    if (!size.w) return;
    home.current = homeView();
    setView(home.current);
  }, [size.w, size.h, resetToken]);

  // Nytt scenario med eget hjemmepunkt: gli dit.
  const homeKey = homeFocus.join(",");
  const firstHome = useRef(true);
  useEffect(() => {
    if (firstHome.current) {
      firstHome.current = false;
      return;
    }
    if (!size.w) return;
    home.current = homeView();
    animateTo(home.current);
  }, [homeKey]);

  /** Hold zoom innenfor grensene og fokuspunktet innenfor MAX_PAN_M fra hjemmeposisjonen. */
  const clamp = (v: View): View => {
    const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom));
    const [fx, fy] = P(homeFocus[0], homeFocus[1]);
    const cx = size.w / 2;
    const cy = size.h / 2;
    // Hvilket bakkepunkt (i skjermmeter) som nå ligger midt på skjermen.
    const mx = (cx - v.x) / zoom - fx;
    const my = (cy - v.y) / zoom - fy;
    const lx = Math.max(-MAX_PAN_M, Math.min(MAX_PAN_M, mx));
    const ly = Math.max(-MAX_PAN_M, Math.min(MAX_PAN_M, my));
    return { zoom, x: cx - (lx + fx) * zoom, y: cy - (ly + fy) * zoom };
  };

  /** Zoom med faktor k rundt skjermpunktet (sx, sy). */
  const zoomAt = (v: View, k: number, sx: number, sy: number): View => {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * k));
    const f = z / v.zoom;
    return clamp({ zoom: z, x: sx - (sx - v.x) * f, y: sy - (sy - v.y) * f });
  };

  // Flytt kartet mykt til fremhevede objekter (f.eks. etter feil svar).
  useEffect(() => {
    if (!focus.token || !focus.points.length || !size.w) return;
    const from = viewRef.current;
    const xs = focus.points.map((p) => p[0]);
    const ys = focus.points.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    // Zoom litt inn, men aldri så mye at noen av de fremhevede objektene faller utenfor.
    const wide = size.w > 900;
    const availW = wide ? (size.w - 440) * 0.85 : size.w * 0.9;
    const narrow = wide ? null : narrowStage();
    const availH = narrow ? narrow.height * 0.9 : size.h * 0.75;
    const fit = Math.min(availW / (x1 - x0 + 12), availH / (y1 - y0 + 10));
    const zoom = Math.max(MIN_ZOOM, Math.min(Math.max(from.zoom, home.current.zoom * 1.25), fit));
    const [sx, wideCy] = stageCenter();
    const sy = narrow ? narrow.cy : wideCy;
    animateTo(clamp({ zoom, x: sx - zoom * ((x0 + x1) / 2), y: sy - zoom * ((y0 + y1) / 2) }));
    return () => cancelAnimationFrame(anim.current);
    // Kjøres kun når et nytt fokus bestilles.
  }, [focus.token]);

  return {
    view,
    dragged,
    onPointerDown(e: PointerEvent) {
      cancelAnimationFrame(anim.current);
      pointers.current.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.current.size === 1) {
        dragged.current = false;
        downAt.current = [e.clientX, e.clientY];
      }
    },
    onPointerMove(e: PointerEvent, rect: DOMRect) {
      const prev = pointers.current.get(e.pointerId);
      if (!prev) return;
      const all = [...pointers.current.values()];
      pointers.current.set(e.pointerId, [e.clientX, e.clientY]);
      if (Math.hypot(e.clientX - downAt.current[0], e.clientY - downAt.current[1]) > CLICK_TOLERANCE) {
        dragged.current = true;
      }
      if (all.length === 1) {
        const dx = e.clientX - prev[0];
        const dy = e.clientY - prev[1];
        setView((v) => clamp({ ...v, x: v.x + dx, y: v.y + dy }));
      } else if (all.length === 2) {
        const other = all.find((p) => p !== prev)!;
        const before = Math.hypot(prev[0] - other[0], prev[1] - other[1]);
        const after = Math.hypot(e.clientX - other[0], e.clientY - other[1]);
        const mx = (e.clientX + other[0]) / 2 - rect.left;
        const my = (e.clientY + other[1]) / 2 - rect.top;
        setView((v) => {
          const z = zoomAt(v, after / Math.max(1, before), mx, my);
          return clamp({ ...z, x: z.x + (e.clientX - prev[0]) / 2, y: z.y + (e.clientY - prev[1]) / 2 });
        });
      }
    },
    onPointerUp(e: PointerEvent) {
      pointers.current.delete(e.pointerId);
    },
    onWheel(e: WheelEvent, rect: DOMRect) {
      const k = Math.exp(-e.deltaY * 0.0015);
      setView((v) => zoomAt(v, k, e.clientX - rect.left, e.clientY - rect.top));
    },
  };
}

type Layer = { scenario: Scenario; dv: number; active: boolean };

const INACTIVE = { selected: false, hovered: false, highlighted: false, handlers: undefined };

/** Skjermpunkter (meter, før zoom) for de fremhevede objektene. */
function focusPoints(scenario: Scenario, ids: string[]): Vec2[] {
  const points: Vec2[] = [];
  for (const id of ids) {
    if (id === CENTER_LINE_ID) points.push(P(0, 15));
    if (id === PLAYER_ID) points.push(P(PLAYER_U, 0, 0.8));
    const sign = scenario.signs.find((s) => s.id === id);
    if (sign) points.push(P(sign.pos[0], sign.pos[1], 2.5));
    const veh = scenario.vehicles.find((v) => v.id === id);
    if (veh) points.push(P(veh.pos[0], veh.pos[1], 0.8));
    const ped = scenario.pedestrians?.find((p) => p.id === id);
    if (ped) points.push(P(ped.pos[0], ped.pos[1], 0.9));
    const mark = scenario.markings.find((m) => m.id === id);
    if (mark) points.push(P((mark.a[0] + mark.b[0]) / 2, (mark.a[1] + mark.b[1]) / 2));
  }
  return points;
}

export function Board() {
  useConveyor();
  const index = useGame((s) => s.index);
  const next = useGame((s) => s.next);
  const progress = useGame((s) => s.progress);
  const hovered = useGame((s) => s.hovered);
  const selected = useGame((s) => s.selected);
  const highlight = useGame((s) => s.highlight);
  const picks = useGame((s) => s.picks);
  const answers = useGame((s) => s.answers);
  const showAllRoutes = useGame((s) => s.showAllRoutes);
  const question = useCurrentQuestion();
  const focusToken = useGame((s) => s.focusToken);
  const { select, setHovered, pickInScene } = useGame.getState();

  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = svgRef.current!;
    const ro = new ResizeObserver(([entry]) =>
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pz = usePanZoom(
    size,
    { token: focusToken, points: focusPoints(SCENARIOS[index], highlight) },
    SCENARIOS[index].view?.focus ?? DEFAULT_FOCUS,
  );

  // Transportbånd: nåværende scenario ruller bakover, neste kommer inn forfra.
  const travel = next === null ? 0 : easeInOut(progress) * CONVEYOR_DISTANCE;
  const layers: Layer[] = [{ scenario: SCENARIOS[index], dv: -travel, active: next === null }];
  if (next !== null) layers.push({ scenario: SCENARIOS[next], dv: CONVEYOR_DISTANCE - travel, active: false });

  // Klikk-/rekkefølgespørsmål: klikk i tegningen besvarer spørsmålet i stedet for å vise info.
  const picking = next === null && isSceneQuestion(question) && !answers[question!.id];

  const interactive = (kind: SelectionKind, id: string) => ({
    selected: selected?.kind === kind && selected.id === id,
    hovered: hovered === id,
    highlighted: highlight.includes(id),
    handlers: {
      onClick: (e: MouseEvent) => {
        e.stopPropagation();
        if (picking) pickInScene(id);
        else select({ kind, id });
      },
      onPointerEnter: () => setHovered(id),
      onPointerLeave: () => setHovered(null),
    },
  });

  // Stående figurer sorteres bakfra og frem.
  const figures: { key: string; d: number; node: ReactNode }[] = [];
  for (const { scenario, dv, active } of layers) {
    const pre = `${scenario.id}:`;
    for (const decor of scenario.decor ?? []) {
      figures.push({
        key: pre + decor.type + decor.pos.join(","),
        d: depth(decor.pos[0], decor.pos[1] + dv),
        node: <DecorFigure decor={decor} dv={dv} />,
      });
    }
    for (const sign of scenario.signs) {
      const it = active ? interactive("sign", sign.id) : INACTIVE;
      figures.push({
        key: pre + sign.id,
        d: depth(sign.pos[0], sign.pos[1] + dv),
        node: <SignFigure sign={sign} dv={dv} {...it} />,
      });
    }
    for (const veh of scenario.vehicles) {
      const it = active ? interactive("vehicle", veh.id) : INACTIVE;
      figures.push({
        key: pre + veh.id,
        d: depth(veh.pos[0], veh.pos[1] + dv),
        node: (
          <CarFigure
            type={veh.type}
            pos={[veh.pos[0], veh.pos[1] + dv]}
            heading={veh.heading}
            color={veh.color ?? DEFAULT_COLOR}
            indicator={veh.indicator}
            siren={veh.siren}
            {...it}
          />
        ),
      });
    }
    for (const ped of scenario.pedestrians ?? []) {
      const it = active ? interactive("pedestrian", ped.id) : INACTIVE;
      const moved = { ...ped, pos: [ped.pos[0], ped.pos[1] + dv] as Vec2 };
      figures.push({
        key: pre + ped.id,
        d: depth(moved.pos[0], moved.pos[1]),
        node: <PedestrianFigure ped={moved} {...it} />,
      });
    }
  }
  figures.push({
    key: "player",
    d: depth(PLAYER_U, 0),
    node: (
      <CarFigure
        pos={[PLAYER_U, 0]}
        heading="N"
        color={PLAYER_COLOR}
        indicator={SCENARIOS[index].player.indicator}
        className={`player${next !== null ? " is-driving" : ""}`}
        {...(next === null ? interactive("vehicle", PLAYER_ID) : INACTIVE)}
      />
    ),
  });
  figures.sort((a, b) => a.d - b.d);

  const current = layers[0];
  const scenario = current.scenario;

  // Kjøreruter: valgt kjøretøy, eller alle når bryteren er på.
  const routes: { id: string; route: Route; color: string; trim?: number }[] = [];
  if (current.active) {
    const isShown = (id: string) => showAllRoutes || selected?.id === id;
    if (scenario.player.route && isShown(PLAYER_ID)) {
      routes.push({ id: PLAYER_ID, route: scenario.player.route, color: PLAYER_COLOR });
    }
    for (const v of scenario.vehicles) {
      if (v.route && isShown(v.id)) routes.push({ id: v.id, route: v.route, color: v.color ?? DEFAULT_COLOR });
    }
    for (const p of scenario.pedestrians ?? []) {
      if (p.route && isShown(p.id)) routes.push({ id: p.id, route: p.route, color: p.color ?? PED_COLOR, trim: 0.6 });
    }
  }

  // Nummerskilt over kjøretøy i rekkefølgespørsmål: dine klikk, eller fasit etter svar.
  const badges: { id: string; n: number; kind: "pick" | "answer" }[] = [];
  if (current.active && question?.type === "order") {
    // I prøvemodus vises aldri fasit underveis.
    const answered = answers[question.id] && !useGame.getState().exam;
    const list = answered ? question.correct : picks;
    list.forEach((id, i) => badges.push({ id, n: i + 1, kind: answered ? "answer" : "pick" }));
  }
  const vehicleAt = (id: string): { pos: Vec2; h: number } | null => {
    if (id === PLAYER_ID) return { pos: [PLAYER_U, 0], h: vehicleTopHeight("personbil") };
    const v = scenario.vehicles.find((x) => x.id === id);
    if (v) return { pos: v.pos, h: vehicleTopHeight(v.type) };
    const p = scenario.pedestrians?.find((x) => x.id === id);
    return p ? { pos: p.pos, h: 1.9 } : null;
  };

  return (
    <svg
      ref={svgRef}
      className={`board${picking ? " is-picking" : ""}`}
      onPointerDown={pz.onPointerDown}
      onPointerMove={(e) => pz.onPointerMove(e, svgRef.current!.getBoundingClientRect())}
      onPointerUp={pz.onPointerUp}
      onPointerCancel={pz.onPointerUp}
      onWheel={(e) => pz.onWheel(e, svgRef.current!.getBoundingClientRect())}
      onClickCapture={(e) => {
        if (pz.dragged.current) e.stopPropagation();
      }}
      onClick={() => select(null)}
    >
      <defs>
        <radialGradient id="vignette" cx="50%" cy="55%" r="75%">
          <stop offset="55%" stopColor="var(--bp-bg)" stopOpacity={0} />
          <stop offset="100%" stopColor="var(--bp-bg)" stopOpacity={0.95} />
        </radialGradient>
      </defs>
      <g transform={`translate(${pz.view.x} ${pz.view.y}) scale(${pz.view.zoom})`}>
        <g transform={GROUND_MATRIX}>
          <Grid />
          <MainRoad />
          {layers.map(({ scenario, dv }, i) => (
            <g key={scenario.id} transform={`translate(0 ${dv})`}>
              <RoadFeatures road={scenario.road} extras={scenario.roadExtras} />
              {/* Scenarioene deler midtlinjen mellom seg så den henger sammen på båndet */}
              <CenterLine
                scenario={scenario}
                lo={i === 0 ? -ROAD_EXTENT : -SCENARIO_HALF}
                hi={i === 0 && layers.length > 1 ? SCENARIO_HALF : ROAD_EXTENT}
                highlighted={i === 0 && highlight.includes(CENTER_LINE_ID)}
              />
              <Markings markings={scenario.markings} highlight={scenario === current.scenario ? highlight : []} />
            </g>
          ))}
          {routes.map((r) => (
            <RouteArrow key={r.id} route={r.route} color={r.color} startTrim={r.trim} />
          ))}
          {/* Interessepunkter (kun i aktivt scenario) */}
          {current.active && (
            <g className="pois">
              {[
                ...current.scenario.signs.map((s) => ({ kind: "sign" as const, id: s.id, pos: s.pos })),
                ...current.scenario.vehicles.map((v) => ({
                  kind: "vehicle" as const,
                  id: v.id,
                  pos: v.pos,
                  r: v.type === "buss" ? 6.8 : v.type === "utrykning" ? 4 : undefined,
                })),
                ...(current.scenario.pedestrians ?? []).map((p) => ({ kind: "pedestrian" as const, id: p.id, pos: p.pos })),
                // Egen bil får ring bare når den kan være et svar.
                ...(picking ? [{ kind: "vehicle" as const, id: PLAYER_ID, pos: [PLAYER_U, 0] as Vec2 }] : []),
              ].map(({ kind, id, pos, ...rest }) => {
                const r = ("r" in rest && rest.r) || POI_RADIUS[kind];
                const it = interactive(kind, id);
                return (
                  <g
                    key={id}
                    className={`poi${it.selected ? " is-selected" : ""}${it.hovered ? " is-hovered" : ""}${it.highlighted ? " is-highlighted" : ""}`}
                    {...it.handlers}
                  >
                    <circle cx={pos[0]} cy={pos[1]} r={r} className="poi-fill" />
                    <circle cx={pos[0]} cy={pos[1]} r={r} className="poi-pulse" />
                  </g>
                );
              })}
            </g>
          )}
        </g>
        {figures.map((f) => (
          <g key={f.key}>{f.node}</g>
        ))}
        {badges.map(({ id, n, kind }) => {
          const at = vehicleAt(id);
          if (!at) return null;
          const [x, y] = P(at.pos[0], at.pos[1], at.h + 1.6);
          return (
            <g key={id} className={`badge is-${kind}`} transform={`translate(${x} ${y})`} pointerEvents="none">
              <circle r={1.1} />
              <text dy="0.05">{n}</text>
            </g>
          );
        })}
      </g>
      <rect width="100%" height="100%" fill="url(#vignette)" pointerEvents="none" />
    </svg>
  );
}
