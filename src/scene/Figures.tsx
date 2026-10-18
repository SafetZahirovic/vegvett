import type { CSSProperties, SVGProps } from "react";
import type { Decor, Heading, Pedestrian, SignPlacement, Vec2, VehicleType } from "../scenarios/types";
import { getSign } from "../signs/registry";
import { shapePoints } from "../signs/shapes";
import { getSignDataUrl } from "../signs/textures";
import { DIR, P, boxFaces, facesViewer, groundEllipse, headingVec, pts, rightOf } from "./iso";

/**
 * Stående figurer tegnes i skjermkoordinater (meter × zoom) med P(u, v, h).
 * Størrelser er bevisst overdrevet så skilt er lesbare fra oversikten.
 */

type Handlers = Pick<SVGProps<SVGGElement>, "onClick" | "onPointerEnter" | "onPointerLeave">;

const SIGN_SIZE = 2.4;
const SIGN_BOTTOM = 2.4;

export function SignFigure({
  sign,
  dv,
  selected,
  hovered,
  highlighted,
  handlers,
}: {
  sign: SignPlacement;
  dv: number;
  selected: boolean;
  hovered: boolean;
  highlighted: boolean;
  handlers?: Handlers;
}) {
  const def = getSign(sign.code);
  const [u, v] = [sign.pos[0], sign.pos[1] + dv];
  const n = DIR[sign.facing];
  const r = rightOf([-n[0], -n[1]]);
  const [rx, ry] = P(r[0], r[1]);
  const h = SIGN_BOTTOM + SIGN_SIZE / 2;
  const [cx, cy] = P(u, v, h);
  const [bx, by] = P(u, v, 0);
  const s = SIGN_SIZE;
  const front = facesViewer(n);
  const shape = shapePoints(def.shape);
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
            <image
              href={getSignDataUrl(sign.code, sign.value)}
              x={-s / 2}
              y={-s / 2}
              width={s}
              height={s}
              preserveAspectRatio="none"
            />
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

export function DecorFigure({ decor, dv }: { decor: Decor; dv: number }) {
  const [u, v] = [decor.pos[0], decor.pos[1] + dv];
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
  const faces = boxFaces([u, v], [0, 1], 9 * k, 7 * k, 0, 4 * k);
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
