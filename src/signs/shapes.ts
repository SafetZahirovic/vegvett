/** Ytre form på et skilt. Brukes både til tegning av skiltflaten og baksiden av skiltet i scenen. */
export type SignShape = "triangle-up" | "triangle-down" | "octagon" | "diamond" | "circle" | "square";

type Pt = [number, number];

/**
 * Hjørnepunkter normalisert til en boks på [-0.5, 0.5] (y opp).
 * Sirkel returnerer null og håndteres separat.
 */
export function shapePoints(shape: SignShape): Pt[] | null {
  const h = Math.sqrt(3) / 2; // høyde i likesidet trekant med side 1
  switch (shape) {
    case "triangle-up":
      return [[-0.5, -h / 2], [0.5, -h / 2], [0, h / 2]];
    case "triangle-down":
      return [[-0.5, h / 2], [0.5, h / 2], [0, -h / 2]];
    case "diamond":
      return [[0, 0.5], [0.5, 0], [0, -0.5], [-0.5, 0]];
    case "square":
      return [[-0.5, 0.5], [0.5, 0.5], [0.5, -0.5], [-0.5, -0.5]];
    case "octagon": {
      const r = 0.5 / Math.cos(Math.PI / 8);
      return Array.from({ length: 8 }, (_, i) => {
        const a = Math.PI / 8 + (i * Math.PI) / 4;
        return [Math.cos(a) * r, Math.sin(a) * r] as Pt;
      });
    }
    case "circle":
      return null;
  }
}

export function shapeCentroid(shape: SignShape): Pt {
  const pts = shapePoints(shape);
  if (!pts) return [0, 0];
  const sx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
  const sy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  return [sx, sy];
}
