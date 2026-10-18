import type { Dir, Heading, Vec2 } from "../scenarios/types";

/**
 * Isometrisk projeksjon (30°). Bakkekoordinater [u, v] i meter + høyde h
 * → skjermkoordinater (før zoom). Fremover (v) peker opp-høyre på skjermen,
 * høyre (u) peker ned-høyre.
 */
export const COS = Math.cos(Math.PI / 6);
export const SIN = 0.5;

export function P(u: number, v: number, h = 0): Vec2 {
  return [(u + v) * COS, (u - v) * SIN - h];
}

/** SVG-transform som tegner flate ting i [u, v] direkte på bakkeplanet. */
export const GROUND_MATRIX = `matrix(${COS} ${SIN} ${COS} ${-SIN} 0 0)`;

/** Større verdi = nærmere betrakteren (tegnes sist). */
export const depth = (u: number, v: number) => u - v;

/** Halvakser for en sirkel med radius r på bakken, sett i isometri. */
export const groundEllipse = (r: number) => ({ rx: r * COS * Math.SQRT2, ry: r * SIN * Math.SQRT2 });

export const DIR: Record<Dir, Vec2> = { N: [0, 1], S: [0, -1], E: [1, 0], W: [-1, 0] };

/** Enhetsvektor for en kjøreretning. */
export const headingVec = (h: Heading): Vec2 => {
  if (typeof h === "string") return DIR[h];
  const a = (h * Math.PI) / 180;
  return [Math.sin(a), Math.cos(a)];
};

/** Høyre side sett fra en som kjører i retning `f`. */
export const rightOf = (f: Vec2): Vec2 => [f[1], -f[0]];

/** En flate er synlig hvis normalen peker mot betrakteren (nedover på skjermen). */
export const facesViewer = (n: Vec2) => n[0] - n[1] > 0;

export const pts = (list: Vec2[]) => list.map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`).join(" ");

export type Face = { points: string; kind: "top" | "side"; normal: Vec2 };

/**
 * Synlige flater for en boks på bakken.
 * c = midtpunkt, f = fremover-retning (enhetsvektor), len/wid i meter, h0–h1 høyde.
 */
export function boxFaces(c: Vec2, f: Vec2, len: number, wid: number, h0: number, h1: number): Face[] {
  const r = rightOf(f);
  const corner = (sf: number, sr: number): Vec2 => [
    c[0] + (f[0] * len * sf) / 2 + (r[0] * wid * sr) / 2,
    c[1] + (f[1] * len * sf) / 2 + (r[1] * wid * sr) / 2,
  ];
  const fl = corner(1, -1);
  const fr = corner(1, 1);
  const br = corner(-1, 1);
  const bl = corner(-1, -1);
  const sides: [Vec2, Vec2, Vec2][] = [
    [f, fl, fr],
    [[-f[0], -f[1]], br, bl],
    [r, fr, br],
    [[-r[0], -r[1]], bl, fl],
  ];
  const faces: Face[] = sides
    .filter(([n]) => facesViewer(n))
    .map(([n, a, b]) => ({
      kind: "side",
      normal: n,
      points: pts([P(a[0], a[1], h0), P(b[0], b[1], h0), P(b[0], b[1], h1), P(a[0], a[1], h1)]),
    }));
  faces.push({ kind: "top", normal: [0, 0], points: pts([fl, fr, br, bl].map(([u, v]) => P(u, v, h1))) });
  return faces;
}
