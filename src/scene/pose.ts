import type { Heading, Route, Scenario, Vec2 } from "../scenarios/types";
import { headingVec } from "./iso";
import { PLAYER_U } from "./road";

/**
 * Hvert scenario er tegnet i sine egne koordinater (spilleren i [PLAYER_U, 0] mot N).
 * En Pose plasserer scenarioet i en felles verden: verden = origin + R(theta) · lokal.
 * theta er grader mot klokka (0 = som tegnet, 90 = rotert til venstre).
 *
 * Kameraet følger bilen: tegningen vises i «kamerakoordinater» der bilen alltid står i
 * [PLAYER_U, 0]. Isometrien roterer ikke, så etter en venstresving går vegen videre mot venstre.
 */
export type Pose = { origin: Vec2; theta: number };

export const START_POSE: Pose = { origin: [0, 0], theta: 0 };
const PU: Vec2 = [PLAYER_U, 0];

export function rot(theta: number, [x, y]: Vec2): Vec2 {
  const a = (theta * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c - y * s, x * s + y * c];
}

export const toWorld = (pose: Pose, p: Vec2): Vec2 => {
  const [x, y] = rot(pose.theta, p);
  return [pose.origin[0] + x, pose.origin[1] + y];
};

/** Bilens verdensposisjon når den står på startplassen i scenarioet. */
export const playerWorld = (pose: Pose): Vec2 => toWorld(pose, PU);

/** Kompassgrader (0 = N, 90 = E) for en retningsvektor. */
export const compass = ([x, y]: Vec2): number => (Math.atan2(x, y) * 180) / Math.PI;

/** Omregning fra et scenarios lokale koordinater til kamerakoordinater. */
export type Frame = {
  /** Punkt: lokal → kamera. */
  map: (p: Vec2) => Vec2;
  /** Retning: lokal → kamera. */
  dir: (d: Vec2) => Vec2;
  /** Kjøreretning i kompassgrader i kamera. */
  heading: (h: Heading) => number;
  /** SVG-transform for bakkegruppen (inne i GROUND_MATRIX). */
  svg: string;
};

/** `car` = bilens verdensposisjon akkurat nå (kameraet følger den). */
export function frameFor(pose: Pose, car: Vec2): Frame {
  const tx = pose.origin[0] - car[0] + PU[0];
  const ty = pose.origin[1] - car[1] + PU[1];
  const dir = (d: Vec2) => rot(pose.theta, d);
  return {
    map: (p) => {
      const [x, y] = rot(pose.theta, p);
      return [x + tx, y + ty];
    },
    dir,
    heading: (h) => compass(dir(headingVec(h))),
    svg: `translate(${tx} ${ty}) rotate(${pose.theta})`,
  };
}

// ---------- Kjøreturen mellom scenarioer ----------

export type Travel = {
  /** Bilens bane i verdenskoordinater. */
  path: Vec2[];
  /** Akkumulert lengde ved hvert punkt. */
  cum: number[];
  total: number;
  durationMs: number;
  /** Plasseringen av neste scenario, slik at det starter der bilen slutter. */
  nextPose: Pose;
};

/** Minste kjørelengde, så neste scenario får plass foran bilen. */
const MIN_TRAVEL = 70;

/** Ruten spilleren faktisk kjører. Å kjøre inn til siden (utrykning) gir ingen ny retning. */
function travelRoute(route: Route | undefined): Vec2[] {
  if (!route || route.turn === "pullover" || route.turn === "pullout") return [PU, [PU[0], MIN_TRAVEL]];
  return route.points;
}

/** Nærmeste hovedretning (N/W/S/E) som vinkel mot klokka fra N. */
function snapTurn([x, y]: Vec2): number {
  if (Math.abs(x) > Math.abs(y)) return x < 0 ? 90 : 270;
  return y < 0 ? 180 : 0;
}

export function planTravel(scenario: Scenario, pose: Pose): Travel {
  const local = [...travelRoute(scenario.player.route)];
  // Forleng rett frem til ruten er lang nok.
  const len = (pts: Vec2[]) => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  const last = local[local.length - 1];
  const prev = local[local.length - 2];
  const d0: Vec2 = [last[0] - prev[0], last[1] - prev[1]];
  const dl = Math.hypot(d0[0], d0[1]) || 1;
  const turn = snapTurn(d0);
  const missing = MIN_TRAVEL - len(local);
  const extra = Math.max(missing, 8);
  local.push([last[0] + (d0[0] / dl) * extra, last[1] + (d0[1] / dl) * extra]);

  const path = local.map((p) => toWorld(pose, p));
  const cum = [0];
  for (let i = 1; i < path.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]));
  }
  const total = cum[cum.length - 1];
  const theta = (((pose.theta + turn) % 360) + 360) % 360;
  const end = path[path.length - 1];
  const [ox, oy] = rot(theta, PU);
  return {
    path,
    cum,
    total,
    durationMs: Math.min(4600, Math.max(2600, (total / 30) * 1000)),
    nextPose: { origin: [end[0] - ox, end[1] - oy], theta },
  };
}

/** Bilens posisjon og retning etter `s` meter langs kjøreturen. */
export function travelAt(t: Travel, s: number): { pos: Vec2; dir: Vec2 } {
  const at = (d: number): Vec2 => {
    const x = Math.max(0, Math.min(t.total, d));
    let i = 1;
    while (i < t.cum.length - 1 && t.cum[i] < x) i++;
    const seg = t.cum[i] - t.cum[i - 1] || 1;
    const k = (x - t.cum[i - 1]) / seg;
    const [a, b] = [t.path[i - 1], t.path[i]];
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  };
  const pos = at(s);
  // Retning fra et lite stykke bak til et lite stykke foran gir jevn sving.
  const a = at(s - 1.2);
  const b = at(s + 1.2);
  const dir: Vec2 = [b[0] - a[0], b[1] - a[1]];
  return { pos, dir };
}
