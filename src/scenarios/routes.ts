import { DIR, rightOf } from "../scene/iso";
import { HW, LANE, RB_DRIVE, RB_OUTER } from "../scene/road";
import type { Dir, Route, Turn, Vec2 } from "./types";

/**
 * Hjelpefunksjoner for kjøreruter, så scenarioer kan beskrive ruter med ord
 * i stedet for koordinater.
 */

export type DriveOp = ["fwd", number] | ["turn", "left" | "right", number];

/** Kjører fra `start` i retning `heading` med en rekke rette strekk og 90°-svinger. */
export function drive(start: Vec2, heading: Dir, ops: DriveOp[]): Route {
  let p: Vec2 = [...start];
  let h: Vec2 = [...DIR[heading]];
  const points: Vec2[] = [p];
  let turn: Turn = "straight";
  for (const op of ops) {
    if (op[0] === "fwd") {
      p = [p[0] + h[0] * op[1], p[1] + h[1] * op[1]];
      points.push(p);
      continue;
    }
    const [, side, radius] = op;
    turn = side;
    const k = side === "right" ? 1 : -1;
    const r = rightOf(h);
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const a = ((Math.PI / 2) * i) / steps;
      points.push([
        p[0] + h[0] * radius * Math.sin(a) + r[0] * k * radius * (1 - Math.cos(a)),
        p[1] + h[1] * radius * Math.sin(a) + r[1] * k * radius * (1 - Math.cos(a)),
      ]);
    }
    p = points[points.length - 1];
    h = [r[0] * k, r[1] * k];
  }
  return { points, turn };
}

/** Roterer fra kanonisk retning (kommer fra sør, kjører mot nord) til `from`. */
const ROTATE: Record<Dir, (p: Vec2) => Vec2> = {
  S: ([x, y]) => [x, y],
  N: ([x, y]) => [-x, -y],
  W: ([x, y]) => [y, -x],
  E: ([x, y]) => [-y, x],
};

const HEADING_FROM: Record<Dir, Dir> = { S: "N", N: "S", W: "E", E: "W" };

/**
 * Rute gjennom et kryss med sentrum i [0, at] for et kjøretøy i høyre felt.
 *
 * @param from  Siden av krysset kjøretøyet kommer fra (S = nedenfra, som spilleren).
 * @param start Avstand fra kjøretøyets midtpunkt til krysset sentrum.
 * @param end   Hvor langt ruten fortsetter etter krysset.
 */
export function junctionRoute(opts: { from: Dir; turn: Turn; at: number; start: number; end?: number }): Route {
  const { from, turn, at, start, end = 22 } = opts;
  const half = LANE / 2;
  let ops: DriveOp[];
  if (turn === "straight") {
    ops = [["fwd", start + end]];
  } else if (turn === "right") {
    const R = 3;
    ops = [["fwd", start - half - R], ["turn", "right", R], ["fwd", end - half - R]];
  } else {
    // Venstresving: vid bue som ender i høyre felt på vegen til venstre.
    const R = half + HW + 0.5;
    ops = [["fwd", start + half - R], ["turn", "left", R], ["fwd", end - (R - half)]];
  }
  const canonical = drive([half, -start], "N", ops);
  return {
    turn,
    points: canonical.points.map((p) => {
      const [x, y] = ROTATE[from](p);
      return [x, y + at] as Vec2;
    }),
  };
}

/** Startposisjon og kjøreretning for et kjøretøy `start` meter før et kryss. */
export function junctionStart(from: Dir, at: number, start: number): { pos: Vec2; heading: Dir } {
  const [x, y] = ROTATE[from]([LANE / 2, -start]);
  return { pos: [x, y + at], heading: HEADING_FROM[from] };
}

/** Glatter ut en polylinje (Chaikin), endepunktene beholdes. */
function smooth(points: Vec2[], iterations = 3): Vec2[] {
  let p = points;
  for (let k = 0; k < iterations; k++) {
    const out: Vec2[] = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const [a, b] = [p[i], p[i + 1]];
      out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25]);
      out.push([a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
    }
    out.push(p[p.length - 1]);
    p = out;
  }
  return p;
}

/** Armenes vinkel (grader, 0 = øst, mot klokka) i rundkjøringen. */
const ARM_ANGLE: Record<Dir, number> = { S: -90, E: 0, N: 90, W: 180 };
const ARM_ORDER: Dir[] = ["S", "E", "N", "W"];
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Punkt i et felt på en arm: `inbound` = kjører inn mot rundkjøringen. */
function armLane(arm: Dir, r: number, at: number, inbound: boolean): Vec2 {
  const d: Vec2 = [Math.cos(rad(ARM_ANGLE[arm])), Math.sin(rad(ARM_ANGLE[arm]))];
  const heading: Vec2 = inbound ? [-d[0], -d[1]] : d;
  const off = rightOf(heading);
  return [d[0] * r + (off[0] * LANE) / 2, at + d[1] * r + (off[1] * LANE) / 2];
}

/**
 * Rute gjennom en rundkjøring med sentrum i [0, at], mot klokka (høyretrafikk).
 * Start enten på en arm (`from` + `start` = avstand fra sentrum) eller inne i ringen (`ringAngle`, grader).
 */
export function roundaboutRoute(opts: {
  at: number;
  exit: Dir;
  from?: Dir;
  start?: number;
  ringAngle?: number;
  end?: number;
}): Route {
  const { at, exit, from, start = 30, ringAngle, end = 30 } = opts;
  const delta = (Math.asin(LANE / 2 / RB_DRIVE) * 180) / Math.PI;
  const points: Vec2[] = [];
  let a0: number;
  if (from) {
    points.push(armLane(from, start, at, true), armLane(from, RB_OUTER + 1, at, true));
    a0 = ARM_ANGLE[from] + delta;
  } else {
    a0 = ringAngle ?? 0;
  }
  let a1 = ARM_ANGLE[exit] - delta;
  while (a1 <= a0 + 5) a1 += 360;
  for (let a = a0; a < a1; a += 10) points.push([RB_DRIVE * Math.cos(rad(a)), at + RB_DRIVE * Math.sin(rad(a))]);
  points.push([RB_DRIVE * Math.cos(rad(a1)), at + RB_DRIVE * Math.sin(rad(a1))]);
  points.push(armLane(exit, RB_OUTER + 1, at, false), armLane(exit, RB_OUTER + end, at, false));

  // Kjøretøy som allerede er i ringen, svinger til høyre ut av rundkjøringen.
  let turn: Turn = "right";
  if (from) {
    const k = (ARM_ORDER.indexOf(exit) - ARM_ORDER.indexOf(from) + 4) % 4;
    turn = (["uturn", "right", "straight", "left"] as const)[k];
  }
  return { points: smooth(points), turn };
}

/** Posisjon og kjøreretning for et kjøretøy inne i rundkjøringen (vinkel i grader, 0 = øst). */
export function ringPosition(at: number, angle: number): { pos: Vec2; heading: number } {
  const a = rad(angle);
  const tangent: Vec2 = [-Math.sin(a), Math.cos(a)];
  return {
    pos: [RB_DRIVE * Math.cos(a), at + RB_DRIVE * Math.sin(a)],
    heading: (Math.atan2(tangent[0], tangent[1]) * 180) / Math.PI,
  };
}
