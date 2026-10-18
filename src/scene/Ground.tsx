import type { CenterLineType, Dir, Marking, RoadExtra, RoadLayout, Scenario, Vec2 } from "../scenarios/types";
import { DIR } from "./iso";
import { CENTER_DASH, CYCLE_GAP, CYCLE_WIDTH, HW, RB_INNER, RB_OUTER, RB_SPLITTER, ROAD_EXTENT as E } from "./road";

/**
 * Alt som ligger flatt på bakken tegnes i [u, v]-meter inne i en gruppe med
 * GROUND_MATRIX, så isometrien kommer gratis fra SVG-transformen.
 */

const SHOULDER = 0.3;
const LINE = 0.15;

const sub = (a: Vec2, b: Vec2): Vec2 => [a[0] - b[0], a[1] - b[1]];
const add = (a: Vec2, b: Vec2, k = 1): Vec2 => [a[0] + b[0] * k, a[1] + b[1] * k];
const poly = (p: Vec2[]) => p.map((q) => q.join(",")).join(" ");

/** Blueprint-rutenett. Ligger fast mens veien glir over det. */
export function Grid() {
  return (
    <>
      <defs>
        <pattern id="grid-fine" width={2} height={2} patternUnits="userSpaceOnUse">
          <path d="M 2 0 L 0 0 0 2" className="grid-fine" />
        </pattern>
        <pattern id="grid" width={10} height={10} patternUnits="userSpaceOnUse">
          <rect width={10} height={10} fill="url(#grid-fine)" />
          <path d="M 10 0 L 0 0 0 10" className="grid-major" />
        </pattern>
      </defs>
      <rect x={-200} y={-200} width={400} height={400} fill="url(#grid)" />
    </>
  );
}

/** Hovedveien uten midtlinje (midtlinjen tilhører hvert scenario, se CenterLine). */
export function MainRoad() {
  const w = HW + SHOULDER;
  return (
    <g>
      <rect x={-w} y={-E} width={w * 2} height={E * 2} className="road" />
      <line x1={-w} y1={-E} x2={-w} y2={E} className="road-edge" />
      <line x1={w} y1={-E} x2={w} y2={E} className="road-edge" />
      <rect x={-HW + 0.1} y={-E} width={LINE} height={E * 2} className="paint" />
      <rect x={HW - 0.1 - LINE} y={-E} width={LINE} height={E * 2} className="paint" />
    </g>
  );
}

const DASH: Record<CenterLineType, [number, number] | null> = {
  midtlinje: [...CENTER_DASH],
  varsellinje: [9, 3],
  sperrelinje: null,
  midtdeler: null,
};

/** Halv bredde på et smalt vegparti. */
const NARROW_HALF = 2.3;
const NARROW_TAPER = 6;

/** Strekninger (v) der hovedvegens midtlinje skal ha opphold, f.eks. gjennom kryss. */
function centerGaps(road: RoadLayout): [number, number][] {
  switch (road.type) {
    case "rett":
      return [];
    case "t-kryss":
    case "x-kryss":
      return [[road.at - HW - 0.5, road.at + HW + 0.5]];
    case "rundkjoring":
      return [[road.at - RB_OUTER - RB_SPLITTER, road.at + RB_OUTER + RB_SPLITTER]];
  }
}

/** Trekker luker fra et intervall. */
function subtract([a, b]: [number, number], gaps: [number, number][]): [number, number][] {
  let parts: [number, number][] = [[a, b]];
  for (const [g0, g1] of gaps) {
    parts = parts.flatMap(([p0, p1]): [number, number][] => {
      if (g1 <= p0 || g0 >= p1) return [[p0, p1]];
      return [
        [p0, Math.min(p1, g0)],
        [Math.max(p0, g1), p1],
      ].filter(([x, y]) => y - x > 0.1) as [number, number][];
    });
  }
  return parts;
}

/** Hovedvegens midtlinje for ett scenario, tegnet i v ∈ [lo, hi). Strekmønsteret er forankret i v = 0. */
function extraGaps(extras: RoadExtra[] = []): [number, number][] {
  return extras.flatMap((x): [number, number][] => (x.type === "smalt" ? [[x.from - 2, x.to + 2]] : []));
}

export function CenterLine({
  scenario,
  lo = -E,
  hi = E,
  highlighted = false,
}: {
  scenario: Scenario;
  lo?: number;
  hi?: number;
  highlighted?: boolean;
}) {
  const segments = scenario.centerLine ?? [{ type: "midtlinje" as const }];
  const gaps = [...centerGaps(scenario.road), ...extraGaps(scenario.roadExtras)];
  return (
    <g className={highlighted ? "is-highlighted-line" : undefined}>
      {segments.flatMap((seg, i) => {
        const range: [number, number] = [Math.max(lo, seg.from ?? -E), Math.min(hi, seg.to ?? E)];
        if (range[1] <= range[0]) return [];
        const dash = DASH[seg.type];
        // Sperrelinje som midtlinje tegnes dobbel (1006.4); en enkel sperrelinje brukes ikke alene.
        const offsets = seg.type === "sperrelinje" ? [-0.15, 0.15] : [0];
        if (seg.type === "midtdeler") {
          // Midtdeler (motorveg): smal øy med rekkverk, skiller kjøreretningene fysisk.
          return subtract(range, gaps).map(([a, b]) => (
            <g key={`${i}:${a}`}>
              <rect x={-0.6} y={a} width={1.2} height={b - a} className="island" />
              <line x1={0} y1={a} x2={0} y2={b} className="guardrail" />
            </g>
          ));
        }
        return subtract(range, gaps).flatMap(([a, b]) =>
          offsets.map((x) => (
            <line
              key={`${i}:${a}:${x}`}
              x1={x}
              y1={a}
              x2={x}
              y2={b}
              className={`center-line is-${seg.type}`}
              strokeWidth={seg.type === "sperrelinje" ? 0.1 : LINE}
              strokeDasharray={dash ? dash.join(" ") : undefined}
              strokeDashoffset={dash ? a : undefined}
            />
          )),
        );
      })}
    </g>
  );
}

/**
 * Sidevei langs u-aksen ved v = at, til høyre (side = 1) eller venstre (side = -1).
 * `inner` = hvor vegen starter (fra hovedvegens kant), `centerFrom` = hvor midtlinjen starter.
 */
function SideRoad({
  at,
  side,
  inner = HW,
  centerFrom = HW + 1,
  cover = true,
}: {
  at: number;
  side: 1 | -1;
  inner?: number;
  centerFrom?: number;
  cover?: boolean;
}) {
  const w = HW + SHOULDER;
  const len = E - inner;
  const x0 = side > 0 ? inner : -E;
  const edgeFrom = side * Math.max(inner, w);
  const edgeTo = side * E;
  return (
    <g>
      <rect x={x0} y={at - w} width={len} height={w * 2} className="road" />
      {/* Dekk hovedveiens kantlinje der sidevegen kobles på */}
      {cover && (
        <rect x={side > 0 ? HW - 0.3 : -w - 0.05} y={at - w} width={w - HW + 0.35} height={w * 2} className="road" />
      )}
      <line x1={edgeFrom} y1={at - w} x2={edgeTo} y2={at - w} className="road-edge" />
      <line x1={edgeFrom} y1={at + w} x2={edgeTo} y2={at + w} className="road-edge" />
      <rect x={Math.min(edgeFrom, edgeTo)} y={at - HW + 0.1} width={Math.abs(edgeTo - edgeFrom)} height={LINE} className="paint" />
      <rect
        x={Math.min(edgeFrom, edgeTo)}
        y={at + HW - 0.1 - LINE}
        width={Math.abs(edgeTo - edgeFrom)}
        height={LINE}
        className="paint"
      />
      <line
        x1={side * centerFrom}
        y1={at}
        x2={edgeTo}
        y2={at}
        className="center-line"
        strokeWidth={LINE}
        strokeDasharray={CENTER_DASH.join(" ")}
      />
    </g>
  );
}

/** Armenes vinkler (grader, 0 = øst, mot klokka). */
const ARMS = [-90, 0, 90, 180];

/** Sirkelbue-sti med åpninger der armene kommer inn. */
function ringWithOpenings(r: number, cy: number, halfOpening: number): string {
  const parts: string[] = [];
  for (let i = 0; i < ARMS.length; i++) {
    const a0 = ((ARMS[i] + halfOpening) * Math.PI) / 180;
    const a1 = ((ARMS[(i + 1) % ARMS.length] + (i === ARMS.length - 1 ? 360 : 0) - halfOpening) * Math.PI) / 180;
    const p0 = [r * Math.cos(a0), cy + r * Math.sin(a0)];
    const p1 = [r * Math.cos(a1), cy + r * Math.sin(a1)];
    parts.push(`M ${p0[0]} ${p0[1]} A ${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`);
  }
  return parts.join(" ");
}

function Roundabout({ at }: { at: number }) {
  const w = HW + SHOULDER;
  const opening = (r: number) => (Math.asin(Math.min(1, w / r)) * 180) / Math.PI;
  const splitters = ARMS.map((deg) => {
    const a = (deg * Math.PI) / 180;
    const d: Vec2 = [Math.cos(a), Math.sin(a)];
    const p: Vec2 = [-d[1], d[0]];
    const at0 = RB_OUTER + 0.4;
    const at1 = RB_OUTER + RB_SPLITTER;
    const c = (r: number, k: number): Vec2 => [d[0] * r + p[0] * k, at + d[1] * r + p[1] * k];
    return [c(at0, 0.9), c(at1, 0.15), c(at1, -0.15), c(at0, -0.9)];
  });
  return (
    <g>
      <SideRoad at={at} side={1} inner={RB_OUTER - 2} centerFrom={RB_OUTER + RB_SPLITTER} cover={false} />
      <SideRoad at={at} side={-1} inner={RB_OUTER - 2} centerFrom={RB_OUTER + RB_SPLITTER} cover={false} />
      <circle cx={0} cy={at} r={RB_OUTER + SHOULDER} className="road" />
      <path d={ringWithOpenings(RB_OUTER + SHOULDER, at, opening(RB_OUTER + SHOULDER))} className="road-edge" fill="none" />
      <path
        d={ringWithOpenings(RB_OUTER - 0.2, at, opening(RB_OUTER - 0.2))}
        className="paint-line"
        strokeWidth={LINE}
        fill="none"
      />
      {/* Midtøya */}
      <circle cx={0} cy={at} r={RB_INNER + 0.3} className="paint-line" strokeWidth={LINE} fill="none" />
      <circle cx={0} cy={at} r={RB_INNER} className="island" />
      <circle cx={0} cy={at} r={RB_INNER * 0.55} className="island-inner" />
      {splitters.map((pts, i) => (
        <polygon key={i} points={poly(pts)} className="island" />
      ))}
    </g>
  );
}

/** Busslomme: utvidelse på høyre side av hovedvegen med skrå inn- og utkjøring. */
function Busslomme({ from, to }: { from: number; to: number }) {
  const depth = 3.2;
  const taper = 8;
  const x0 = HW - 0.1;
  const x1 = HW + depth;
  const outline: Vec2[] = [
    [x0, from],
    [x1, from + taper],
    [x1, to - taper],
    [x0, to],
  ];
  return (
    <g>
      <polygon points={poly(outline)} className="road" />
      <polyline points={poly(outline.map(([x, y]) => [x + SHOULDER, y] as Vec2))} className="road-edge" fill="none" />
      {/* Hovedvegens kantlinje blir stiplet forbi lomma */}
      <rect x={HW - 0.35} y={from + 0.5} width={0.5} height={to - from - 1} className="road" />
      <line
        x1={HW - 0.1 - LINE / 2}
        y1={from}
        x2={HW - 0.1 - LINE / 2}
        y2={to}
        className="paint-line"
        strokeWidth={LINE}
        strokeDasharray="1 1"
      />
      <polyline
        points={poly(outline.map(([x, y]) => [x - (x > x0 ? 0.2 : 0), y] as Vec2))}
        className="paint-line"
        strokeWidth={LINE}
        fill="none"
      />
    </g>
  );
}

/** Sykkelsymbol liggende på bakken (to hjul og ramme), sentrert i (x, y), sett i kjøreretningen. */
function BikeSymbol({ x, y }: { x: number; y: number }) {
  return (
    <g className="bike-symbol" transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-0.55} r={0.35} />
      <circle cx={0} cy={0.55} r={0.35} />
      <polyline points="0,-0.55 0,0.1 0.25,0.55 0,0.1 -0.3,-0.1 0.25,0.1" />
    </g>
  );
}

/** Gang- og sykkelveg langs hovedvegen. */
function Sykkelveg({ side, from = -E, to = E }: { side: "left" | "right"; from?: number; to?: number }) {
  const k = side === "right" ? 1 : -1;
  const inner = HW + SHOULDER + CYCLE_GAP;
  const x0 = k > 0 ? inner : -inner - CYCLE_WIDTH;
  const mid = k * (inner + CYCLE_WIDTH / 2);
  const symbols: number[] = [];
  for (let v = Math.ceil(from / 25) * 25; v <= to; v += 25) symbols.push(v);
  return (
    <g>
      <rect x={x0} y={from} width={CYCLE_WIDTH} height={to - from} className="cycle-path" />
      <line x1={x0} y1={from} x2={x0} y2={to} className="road-edge" />
      <line x1={x0 + CYCLE_WIDTH} y1={from} x2={x0 + CYCLE_WIDTH} y2={to} className="road-edge" />
      {symbols.map((v) => (
        <BikeSymbol key={v} x={mid} y={v} />
      ))}
    </g>
  );
}

/** Smalt vegparti: grøntområde dekker kjørebanen utenfor ett felts bredde, med skrå overganger. */
function Smalt({ from, to }: { from: number; to: number }) {
  const w = HW + SHOULDER + 0.05;
  const n = NARROW_HALF;
  const side = (k: 1 | -1) => {
    const outline: Vec2[] = [
      [k * w, from],
      [k * n, from + NARROW_TAPER],
      [k * n, to - NARROW_TAPER],
      [k * w, to],
    ];
    return (
      <g key={k}>
        <polygon points={poly(outline)} className="verge" />
        <polyline points={poly(outline)} className="road-edge" fill="none" />
        <polyline
          points={poly(outline.map(([x, y]) => [x - k * 0.2, y] as Vec2))}
          className="paint-line"
          strokeWidth={LINE}
          fill="none"
        />
      </g>
    );
  };
  return (
    <g>
      {side(1)}
      {side(-1)}
    </g>
  );
}

/** Veiens spesielle deler for et scenario (kryss osv.). */
export function RoadFeatures({ road, extras = [] }: { road: RoadLayout; extras?: RoadExtra[] }) {
  return (
    <g>
      {road.type === "t-kryss" && <SideRoad at={road.at} side={road.branch === "right" ? 1 : -1} />}
      {road.type === "x-kryss" && (
        <>
          <SideRoad at={road.at} side={1} />
          <SideRoad at={road.at} side={-1} />
        </>
      )}
      {road.type === "rundkjoring" && <Roundabout at={road.at} />}
      {/* Etter kryssene, så gang- og sykkelvegen ligger over sidevegene der den krysser dem */}
      {extras.map((x, i) =>
        x.type === "busslomme" ? (
          <Busslomme key={i} from={x.from} to={x.to} />
        ) : x.type === "smalt" ? (
          <Smalt key={i} from={x.from} to={x.to} />
        ) : (
          <Sykkelveg key={i} side={x.side} from={x.from} to={x.to} />
        ),
      )}
    </g>
  );
}


/** Vikelinje: rekke av «haitenner» som peker mot den som har vikeplikt. */
function Vikelinje({ a, b, toward, className }: { a: Vec2; b: Vec2; toward: Dir; className: string }) {
  const d = sub(b, a);
  const len = Math.hypot(d[0], d[1]);
  const t: Vec2 = [d[0] / len, d[1] / len];
  const n = DIR[toward];
  const base = 0.5;
  const gap = 0.25;
  const height = 0.6;
  const teeth: Vec2[][] = [];
  for (let s = 0; s + base <= len + 1e-6; s += base + gap) {
    const p0 = add(a, t, s);
    const p1 = add(a, t, s + base);
    const apex = add(add(a, t, s + base / 2), n, height);
    teeth.push([p0, p1, apex]);
  }
  return (
    <g className={className}>
      {teeth.map((tri, i) => (
        <polygon key={i} points={poly(tri)} />
      ))}
    </g>
  );
}

/** Stopplinje: heltrukken bred linje (0,5 m). */
function Stopplinje({ a, b, className }: { a: Vec2; b: Vec2; className: string }) {
  const d = sub(b, a);
  const len = Math.hypot(d[0], d[1]);
  const n: Vec2 = [(-d[1] / len) * 0.25, (d[0] / len) * 0.25];
  return <polygon className={className} points={poly([add(a, n), add(b, n), add(b, n, -1), add(a, n, -1)])} />;
}

/** Gangfelt: hvite striper på tvers av vegen, parallelle med kjøreretningen. */
function Gangfelt({ a, b, width = 3, className }: { a: Vec2; b: Vec2; width?: number; className: string }) {
  const d = sub(b, a);
  const len = Math.hypot(d[0], d[1]);
  const t: Vec2 = [d[0] / len, d[1] / len];
  const n: Vec2 = [-t[1], t[0]];
  const stripe = 0.5;
  const stripes: Vec2[][] = [];
  for (let s = 0.25; s + stripe <= len; s += stripe * 2) {
    const p0 = add(a, t, s);
    const p1 = add(a, t, s + stripe);
    stripes.push([add(p0, n, -width / 2), add(p1, n, -width / 2), add(p1, n, width / 2), add(p0, n, width / 2)]);
  }
  return (
    <g className={className}>
      {stripes.map((q, i) => (
        <polygon key={i} points={poly(q)} />
      ))}
    </g>
  );
}

export function Markings({ markings, highlight }: { markings: Marking[]; highlight: string[] }) {
  return (
    <g>
      {markings.map((m) => {
        const className = highlight.includes(m.id) ? "paint is-highlighted" : "paint";
        if (m.type === "vikelinje") {
          return <Vikelinje key={m.id} a={m.a} b={m.b} toward={m.toward ?? "S"} className={className} />;
        }
        if (m.type === "gangfelt") {
          return <Gangfelt key={m.id} a={m.a} b={m.b} width={m.width} className={className} />;
        }
        return <Stopplinje key={m.id} a={m.a} b={m.b} className={className} />;
      })}
    </g>
  );
}
