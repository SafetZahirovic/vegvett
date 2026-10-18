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

/** Bil sett bakfra (til skilt 334). cx i normaliserte enheter. */
export function carFromBehind(ctx: CanvasRenderingContext2D, cx: number, color: string) {
  const w = 0.3 * TEX;
  const [x, y] = px(cx - 0.15, 0.02);
  ctx.fillStyle = color;
  // Tak og vinduparti
  ctx.beginPath();
  ctx.roundRect(x + w * 0.16, y - 0.1 * TEX, w * 0.68, 0.12 * TEX, [0.035 * TEX, 0.035 * TEX, 0, 0]);
  ctx.fill();
  // Karosseri
  ctx.beginPath();
  ctx.roundRect(x, y, w, 0.11 * TEX, 0.025 * TEX);
  ctx.fill();
  // Hjul
  ctx.fillRect(x + w * 0.06, y + 0.1 * TEX, w * 0.2, 0.06 * TEX);
  ctx.fillRect(x + w * 0.74, y + 0.1 * TEX, w * 0.2, 0.06 * TEX);
  // Bakrute
  ctx.fillStyle = C.white;
  ctx.fillRect(x + w * 0.26, y - 0.07 * TEX, w * 0.48, 0.05 * TEX);
}
