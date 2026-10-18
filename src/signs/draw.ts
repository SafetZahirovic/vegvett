import { shapeCentroid, shapePoints, type SignShape } from "./shapes";

/** Teksturstørrelse i piksler (kvadratisk). */
export const TEX = 512;

export const C = {
  red: "#c8102e",
  white: "#ffffff",
  black: "#111111",
  yellow: "#ffcc00",
  blue: "#0055a5",
  grey: "#6b6b6b",
};

/** Normalisert koordinat ([-0.5, 0.5], y opp) → canvas-piksler. */
export function px(x: number, y: number): [number, number] {
  return [(x + 0.5) * TEX, (0.5 - y) * TEX];
}

/** Lager en sti for formen, skalert rundt tyngdepunktet. */
export function pathShape(ctx: CanvasRenderingContext2D, shape: SignShape, scale = 1) {
  ctx.beginPath();
  const pts = shapePoints(shape);
  if (!pts) {
    ctx.arc(TEX / 2, TEX / 2, (TEX / 2) * scale, 0, Math.PI * 2);
    return;
  }
  const [cx, cy] = shapeCentroid(shape);
  pts.forEach(([x, y], i) => {
    const [X, Y] = px(cx + (x - cx) * scale, cy + (y - cy) * scale);
    if (i === 0) ctx.moveTo(X, Y);
    else ctx.lineTo(X, Y);
  });
  ctx.closePath();
}

export function fillShape(ctx: CanvasRenderingContext2D, shape: SignShape, scale: number, color: string) {
  pathShape(ctx, shape, scale);
  ctx.fillStyle = color;
  ctx.fill();
}

/** Standard rød-kantet skilt (fareskilt, vikeplikt, forbud). */
export function redBorder(ctx: CanvasRenderingContext2D, shape: SignShape, inner = 0.74) {
  fillShape(ctx, shape, 1, C.red);
  fillShape(ctx, shape, inner, C.white);
}

export function text(
  ctx: CanvasRenderingContext2D,
  str: string,
  x: number,
  y: number,
  sizePx: number,
  color = C.black,
  weight = "bold",
) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${sizePx}px "Arial Narrow", Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const [X, Y] = px(x, y);
  ctx.fillText(str, X, Y);
}
