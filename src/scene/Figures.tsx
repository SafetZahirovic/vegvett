import { useId, type CSSProperties, type SVGProps } from "react";
import type { Animal, AnimalType, Decor, Heading, Pedestrian, SignPlacement, Vec2, VehicleType } from "../scenarios/types";
import { getSign } from "../signs/registry";
import { shapePoints } from "../signs/shapes";
import { signImage } from "../signs/official";
import { P, boxFaces, facesViewer, groundEllipse, headingVec, pts, rightOf } from "./iso";

/**
 * Stående figurer tegnes i skjermkoordinater (meter × zoom) med P(u, v, h).
 * Størrelser er bevisst overdrevet så skilt er lesbare fra oversikten.
 */

type Handlers = Pick<SVGProps<SVGGElement>, "onClick" | "onPointerEnter" | "onPointerLeave">;

const SIGN_SIZE = 2.4;
const SIGN_BOTTOM = 2.4;

export function SignFigure({
  sign,
  pos,
  normal,
  forceFront = false,
  selected,
  hovered,
  highlighted,
  handlers,
}: {
  sign: SignPlacement;
  /** Stolpens fotpunkt i kamerakoordinater. */
  pos: Vec2;
  /** Retningen skiltflaten vender mot, i kamerakoordinater. */
  normal: Vec2;
  /**
   * Vis alltid forsiden (lesbart), også når skiltet vender bort fra kameraet.
   * Brukes for skilt som gjelder spilleren, så de kan leses uansett kjøreretning.
   */
  forceFront?: boolean;
  selected: boolean;
  hovered: boolean;
  highlighted: boolean;
  handlers?: Handlers;
}) {
  const def = getSign(sign.code);
  const [u, v] = pos;
  const n = normal;
  const facing = facesViewer(n);
  const front = facing || forceFront;
  // Sett bakfra speilvendes planet, så forsiden blir lesbar.
  const k = facing ? 1 : -1;
  const r = rightOf([-n[0] * k, -n[1] * k]);
  const [rx, ry] = P(r[0], r[1]);
  const h = SIGN_BOTTOM + SIGN_SIZE / 2;
  const [cx, cy] = P(u, v, h);
  const [bx, by] = P(u, v, 0);
  const s = SIGN_SIZE;
  const shape = shapePoints(def.shape);
  const img = signImage(sign.code, sign.value);
  // Offisielle bilder har hvit bakgrunn i hjørnene: klipp dem til skiltets form.
  const clipId = useId();
  const clipScale = 0.985;
  const outline = shape ? (
    <polygon points={shape.map(([x, y]) => `${x * s},${-y * s}`).join(" ")} />
  ) : (
    <circle r={s / 2} />
  );

  return (
    <g
      className={`fig sign${selected ? " is-selected" : ""}${hovered ? " is-hovered" : ""}${highlighted ? " is-highlighted" : ""}`}
      {...handlers}
    >
      <line x1={bx} y1={by} x2={cx} y2={cy} className="post" />
      <g transform={`matrix(${rx} ${ry} 0 1 ${cx} ${cy})`}>
        <g className="sign-plate">
          {front ? (
            <>
              {img.official && def.shape !== "square" && (
                <clipPath id={clipId}>
                  {shape ? (
                    <polygon points={shape.map(([x, y]) => `${x * s * clipScale},${-y * s * clipScale}`).join(" ")} />
                  ) : (
                    <circle r={(s / 2) * clipScale} />
                  )}
                </clipPath>
              )}
              <image
                href={img.url}
                x={-s / 2}
                y={-s / 2}
                width={s}
                height={s}
                preserveAspectRatio={img.official ? "xMidYMid meet" : "none"}
                clipPath={img.official && def.shape !== "square" ? `url(#${clipId})` : undefined}
              />
            </>
          ) : (
            <g className="sign-back">{outline}</g>
          )}
          <g className="sign-outline">{outline}</g>
        </g>
      </g>
    </g>
  );
}

type Shape = {
  len: number;
  wid: number;
  body: [number, number];
  /** Øvre del (kupé / syklist), forskjøvet bakover med `off` meter. */
  top: { len: number; wid: number; off: number; h: [number, number] };
  lights: boolean;
};

const SHAPES: Record<VehicleType, Shape> = {
  personbil: { len: 4.4, wid: 1.8, body: [0.3, 0.95], top: { len: 2.3, wid: 1.6, off: 0.3, h: [0.95, 1.55] }, lights: true },
  sykkel: { len: 1.8, wid: 0.4, body: [0.35, 0.85], top: { len: 0.5, wid: 0.45, off: 0.2, h: [0.85, 1.75] }, lights: false },
  buss: { len: 12, wid: 2.55, body: [0.35, 3.0], top: { len: 11.4, wid: 2.35, off: 0.1, h: [3.0, 3.2] }, lights: true },
  // Ambulanse: høy varebil med lysbjelke foran på taket.
  utrykning: { len: 5.8, wid: 2.1, body: [0.35, 2.5], top: { len: 0.45, wid: 1.7, off: -1.9, h: [2.5, 2.72] }, lights: true },
};

/** Høyde over bakken for etiketter (rekkefølgenummer) over kjøretøyet. */
export const vehicleTopHeight = (type: VehicleType) => SHAPES[type].top.h[1];

export function CarFigure({
  type = "personbil",
  pos,
  heading,
  color,
  indicator,
  siren,
  selected,
  hovered,
  highlighted,
  className = "",
  handlers,
}: {
  type?: VehicleType;
  pos: Vec2;
  heading: Heading;
  color: string;
  indicator?: "left" | "right";
  siren?: boolean;
  selected?: boolean;
  hovered?: boolean;
  highlighted?: boolean;
  className?: string;
  handlers?: Handlers;
}) {
  const f = headingVec(heading);
  const r = rightOf(f);
  const S = SHAPES[type];
  const topC: Vec2 = [pos[0] - f[0] * S.top.off, pos[1] - f[1] * S.top.off];
  const body = boxFaces(pos, f, S.len, S.wid, S.body[0], S.body[1]);
  const cabin = boxFaces(topC, f, S.top.len, S.top.wid, S.top.h[0], S.top.h[1]);
  const footprint = boxFaces(pos, f, S.len + 0.3, S.wid + 0.3, 0, 0).find((x) => x.kind === "top")!;

  const lamp = (sf: number, sr: number) => {
    const u = pos[0] + (f[0] * S.len * sf) / 2 + (r[0] * S.wid * sr) / 2;
    const v = pos[1] + (f[1] * S.len * sf) / 2 + (r[1] * S.wid * sr) / 2;
    return P(u, v, 0.7);
  };
  const side = indicator === "left" ? -1 : 1;

  return (
    <g
      className={`fig car ${className}${selected ? " is-selected" : ""}${hovered ? " is-hovered" : ""}${highlighted ? " is-highlighted" : ""}`}
      style={{ "--car": color } as CSSProperties}
      {...handlers}
    >
      <polygon points={footprint.points} className="car-shadow" />
      {[...body, ...cabin].map((face, i) => (
        <polygon key={i} points={face.points} className={`car-${face.kind}`} />
      ))}
      {/* Frontlykter viser kjøreretningen */}
      {S.lights &&
        [-0.7, 0.7].map((sr) => {
          const [x, y] = lamp(1, sr / (S.wid / 2));
          return <circle key={sr} cx={x} cy={y - 0.05} r={0.16} className="headlight" />;
        })}
      {S.lights &&
        indicator &&
        [1, -1].map((sf) => {
          const [x, y] = lamp(sf, side);
          return <circle key={sf} cx={x} cy={y} r={0.3} className="indicator" />;
        })}
      {siren &&
        [-1, 1].map((k) => {
          const u = topC[0] + (r[0] * S.top.wid * k) / 2.6;
          const v = topC[1] + (r[1] * S.top.wid * k) / 2.6;
          const [x, y] = P(u, v, S.top.h[1] + 0.1);
          return <circle key={k} cx={x} cy={y} r={0.35} className={`bluelight${k > 0 ? " is-alt" : ""}`} />;
        })}
    </g>
  );
}

export function DecorFigure({ decor, pos, forward }: { decor: Decor; pos: Vec2; forward: Vec2 }) {
  const [u, v] = pos;
  const k = decor.size ?? 1;
  if (decor.type === "tre") {
    const [x, y] = P(u, v);
    const { rx, ry } = groundEllipse(1.6 * k);
    const top = 7 * k;
    return (
      <g className="fig decor">
        <ellipse cx={x} cy={y} rx={rx} ry={ry} />
        <polygon points={pts([[x - rx, y], [x, y - top], [x + rx, y]])} />
        <polyline points={pts([[x - rx * 0.75, y - top * 0.35], [x, y - top * 0.55], [x + rx * 0.75, y - top * 0.35]])} />
      </g>
    );
  }
  const faces = boxFaces([u, v], forward, 9 * k, 7 * k, 0, 4 * k);
  return (
    <g className="fig decor">
      {faces.map((face, i) => (
        <polygon key={i} points={face.points} />
      ))}
    </g>
  );
}

/** Fotgjenger: kropp som smal boks og hode som sirkel. */
export function PedestrianFigure({
  ped,
  selected,
  hovered,
  highlighted,
  handlers,
}: {
  ped: Pedestrian;
  selected: boolean;
  hovered: boolean;
  highlighted: boolean;
  handlers?: Handlers;
}) {
  const f = headingVec(ped.heading);
  const legs = boxFaces(ped.pos, f, 0.3, 0.4, 0, 0.85);
  const body = boxFaces(ped.pos, f, 0.32, 0.5, 0.85, 1.5);
  const [hx, hy] = P(ped.pos[0], ped.pos[1], 1.72);
  const footprint = boxFaces(ped.pos, f, 0.6, 0.7, 0, 0).find((x) => x.kind === "top")!;
  return (
    <g
      className={`fig car ped${selected ? " is-selected" : ""}${hovered ? " is-hovered" : ""}${highlighted ? " is-highlighted" : ""}`}
      style={{ "--car": ped.color ?? "#f4a7ff" } as CSSProperties}
      {...handlers}
    >
      <polygon points={footprint.points} className="car-shadow" />
      {[...legs, ...body].map((face, i) => (
        <polygon key={i} points={face.points} className={`car-${face.kind}`} />
      ))}
      <circle cx={hx} cy={hy} r={0.24} className="car-top" />
    </g>
  );
}

type AnimalShape = {
  len: number;
  wid: number;
  /** Høyde på beina (underkant kropp) og kroppens overkant. */
  legs: number;
  top: number;
  /** Hode foran på kroppen. */
  head: { len: number; h: [number, number] };
  antlers: boolean;
  color: string;
};

const ANIMALS: Record<AnimalType, AnimalShape> = {
  elg: { len: 2.6, wid: 0.8, legs: 1.15, top: 2.0, head: { len: 0.7, h: [1.7, 2.2] }, antlers: true, color: "#d9a066" },
  rein: { len: 1.8, wid: 0.6, legs: 0.7, top: 1.25, head: { len: 0.5, h: [1.1, 1.45] }, antlers: true, color: "#e6dcc8" },
  hjort: { len: 1.9, wid: 0.6, legs: 0.8, top: 1.35, head: { len: 0.5, h: [1.2, 1.6] }, antlers: true, color: "#c98a5a" },
  ku: { len: 2.3, wid: 0.9, legs: 0.7, top: 1.45, head: { len: 0.55, h: [1.0, 1.45] }, antlers: false, color: "#f0f0f0" },
  sau: { len: 1.2, wid: 0.6, legs: 0.4, top: 0.9, head: { len: 0.35, h: [0.6, 0.95] }, antlers: false, color: "#fafafa" },
};

export const animalTopHeight = (type: AnimalType) => ANIMALS[type].top + (ANIMALS[type].antlers ? 0.5 : 0);

/** Dyr: kropp på fire bein, hode foran og eventuelt gevir. */
export function AnimalFigure({
  animal,
  selected,
  hovered,
  highlighted,
  handlers,
}: {
  animal: Animal;
  selected: boolean;
  hovered: boolean;
  highlighted: boolean;
  handlers?: Handlers;
}) {
  const S = ANIMALS[animal.type];
  const f = headingVec(animal.heading);
  const r = rightOf(f);
  const c = animal.pos;
  const at = (fw: number, rt: number): Vec2 => [c[0] + f[0] * fw + r[0] * rt, c[1] + f[1] * fw + r[1] * rt];
  const legW = Math.max(0.12, S.wid * 0.22);
  const legs = [
    [S.len * 0.32, S.wid * 0.3],
    [S.len * 0.32, -S.wid * 0.3],
    [-S.len * 0.32, S.wid * 0.3],
    [-S.len * 0.32, -S.wid * 0.3],
  ].flatMap(([fw, rt]) => boxFaces(at(fw, rt), f, legW, legW, 0, S.legs));
  const body = boxFaces(c, f, S.len, S.wid, S.legs, S.top);
  const headC = at(S.len / 2 + S.head.len / 2 - 0.1, 0);
  const head = boxFaces(headC, f, S.head.len, S.wid * 0.55, S.head.h[0], S.head.h[1]);
  const footprint = boxFaces(c, f, S.len + 0.4, S.wid + 0.4, 0, 0).find((x) => x.kind === "top")!;
  // Gevir: to grener fra hodet, ut til sidene og opp.
  const antlers = S.antlers
    ? [-1, 1].map((k) => {
        const base = at(S.len / 2 + 0.05, k * 0.15);
        const tip = at(S.len / 2 - 0.1, k * (S.wid * 0.9));
        const p0 = P(base[0], base[1], S.head.h[1]);
        const p1 = P(tip[0], tip[1], S.head.h[1] + 0.45);
        const mid = P((base[0] + tip[0]) / 2, (base[1] + tip[1]) / 2, S.head.h[1] + 0.25);
        const midTip = P((base[0] + tip[0]) / 2, (base[1] + tip[1]) / 2, S.head.h[1] + 0.55);
        return pts([p0, p1]) + "|" + pts([mid, midTip]);
      })
    : [];
  return (
    <g
      className={`fig car animal${selected ? " is-selected" : ""}${hovered ? " is-hovered" : ""}${highlighted ? " is-highlighted" : ""}`}
      style={{ "--car": S.color } as CSSProperties}
      {...handlers}
    >
      <polygon points={footprint.points} className="car-shadow" />
      {[...legs, ...body, ...head].map((face, i) => (
        <polygon key={i} points={face.points} className={`car-${face.kind}`} />
      ))}
      {antlers.flatMap((a, i) => a.split("|").map((p, j) => <polyline key={`${i}${j}`} points={p} className="antler" />))}
    </g>
  );
}
