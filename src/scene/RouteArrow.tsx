import type { Route, Vec2 } from "../scenarios/types";

/** Fjerner `from` meter i starten og `to` meter i slutten av en polylinje. */
function trim(points: Vec2[], from: number, to: number): Vec2[] {
  const lens = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  const total = lens.reduce((a, b) => a + b, 0);
  const at = (d: number): { i: number; p: Vec2 } => {
    let acc = 0;
    for (let i = 0; i < lens.length; i++) {
      if (acc + lens[i] >= d) {
        const k = (d - acc) / lens[i];
        const [a, b] = [points[i], points[i + 1]];
        return { i, p: [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k] };
      }
      acc += lens[i];
    }
    return { i: lens.length - 1, p: points[points.length - 1] };
  };
  const s = at(Math.min(from, total));
  const e = at(Math.max(from, total - to));
  return [s.p, ...points.slice(s.i + 1, e.i + 1), e.p];
}

const fmt = (p: Vec2) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;

/**
 * Animert pil på bakken som viser planlagt kjørevei. Tegnes i bakkekoordinater
 * (inne i GROUND_MATRIX-gruppen).
 */
export function RouteArrow({
  route,
  color,
  dv = 0,
  startTrim = 2.8,
}: {
  route: Route;
  color: string;
  dv?: number;
  /** Hvor mye av starten som skjules (under kjøretøyet). */
  startTrim?: number;
}) {
  const head = 1.6;
  const pts = trim(
    route.points.map(([u, v]) => [u, v + dv] as Vec2),
    startTrim,
    head,
  );
  if (pts.length < 2) return null;
  const d = `M ${pts.map(fmt).join(" L ")}`;
  const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const dir: Vec2 = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  const perp: Vec2 = [dir[1], -dir[0]];
  const tip: Vec2 = [b[0] + dir[0] * head, b[1] + dir[1] * head];
  const w = 0.95;
  const arrowHead = [tip, [b[0] + perp[0] * w, b[1] + perp[1] * w], [b[0] - perp[0] * w, b[1] - perp[1] * w]];

  return (
    <g className="route" style={{ color }} pointerEvents="none">
      <path d={d} className="route-under" />
      <path d={d} className="route-line" />
      <polygon points={arrowHead.map((p) => p.join(",")).join(" ")} className="route-head" />
      <circle r={0.45} className="route-dot">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );
}
