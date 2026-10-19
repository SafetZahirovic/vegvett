import { SCENARIOS } from "../scenarios";
import type { Licence, Scenario, Topic } from "../scenarios/types";
import { inCategory } from "./categories";
import { errorRate, type TopicStat } from "./progress";

/** Vekt for temaer som ikke er prøvd ennå (litt over middels, så de kommer tidlig). */
const UNSEEN_ERROR_RATE = 0.4;
/** Hvor mye feilandelen trekker opp sannsynligheten. 1 + 4 × 100 % feil = 5 ganger så ofte. */
const ERROR_WEIGHT = 4;

/** Andel av scenarioene (de minst nylig sette) som det trekkes fra. Resten venter på tur. */
const FRESH_SHARE = 0.2;
const MIN_POOL = 4;

/** Høyst ett teoriscenario blant så mange på rad, så teori og kjøring blandes. */
const THEORY_EVERY = 3;

export const isTheory = (s: Scenario) => s.kind === "teori";

/**
 * Skal neste scenario være et kjørescenario? Ja hvis noen av de siste `THEORY_EVERY - 1`
 * (nyeste først) var teori, eller hvis det ikke er spilt noe ennå.
 */
function needsDriving(history: string[]): boolean {
  if (history.length === 0) return true;
  return history
    .slice(0, THEORY_EVERY - 1)
    .some((id) => SCENARIOS.find((s) => s.id === id)?.kind === "teori");
}

/** Gjelder scenarioet for valgt klasse? Uten `licences` gjelder det både bil og MC. */
export const forLicence = (s: Scenario, licence: Licence) => (s.licences ?? ["A", "B"]).includes(licence);

/** Scenarioindekser for klassen, sortert fra minst nylig sett (aldri sett først), tilfeldig ved likhet. */
function byFreshness(
  lastSeen: Record<string, number>,
  licence: Licence,
  random: () => number,
  category: string | null = null,
): number[] {
  const tie = new Map(SCENARIOS.map((s) => [s.id, random()]));
  const pool = SCENARIOS.map((_, i) => i).filter(
    (i) => forLicence(SCENARIOS[i], licence) && inCategory(SCENARIOS[i], category),
  );
  return pool.sort((a, b) => {
    const da = lastSeen[SCENARIOS[a].id] ?? 0;
    const db = lastSeen[SCENARIOS[b].id] ?? 0;
    return da - db || tie.get(SCENARIOS[a].id)! - tie.get(SCENARIOS[b].id)!;
  });
}

/**
 * Velger et scenario blant dem du har sett minst nylig (også på tvers av økter), vektet
 * mot temaer du har svart feil på. Slik går alle scenarioene runden før noe gjentas.
 * `history` er scenario-id-ene som er spilt nylig, nyeste først. De velges ikke, og de styrer
 * blandingen av teori og kjøring.
 */
export function pickScenario(
  topics: Partial<Record<Topic, TopicStat>>,
  history: string[],
  lastSeen: Record<string, number> = {},
  licence: Licence = "B",
  random = Math.random,
): number {
  const exclude = new Set(history);
  const driving = needsDriving(history);
  const all = byFreshness(lastSeen, licence, random).filter((i) => !driving || !isTheory(SCENARIOS[i]));
  const ordered = all.filter((i) => !exclude.has(SCENARIOS[i].id));
  const poolSize = Math.max(MIN_POOL, Math.ceil(all.length * FRESH_SHARE));
  let candidates = ordered.slice(0, poolSize).map((i) => ({ s: SCENARIOS[i], i }));
  if (candidates.length === 0) candidates = all.map((i) => ({ s: SCENARIOS[i], i }));
  const weights = candidates.map(({ s }) => 1 + ERROR_WEIGHT * (errorRate(topics[s.topic]) ?? UNSEEN_ERROR_RATE));
  let r = random() * weights.reduce((a, b) => a + b, 0);
  for (let k = 0; k < candidates.length; k++) {
    r -= weights[k];
    if (r <= 0) return candidates[k].i;
  }
  return candidates[candidates.length - 1].i;
}

/**
 * Rekkefølge for en prøve eller runde: scenarioene du har sett minst nylig først, ellers tilfeldig.
 * Ett teoriscenario etter hvert `THEORY_EVERY - 1` kjørescenario, så lenge det er nok av begge.
 * `category` begrenser til én kategori (null = alle).
 */
export function shuffledScenarioOrder(
  lastSeen: Record<string, number> = {},
  licence: Licence = "B",
  category: string | null = null,
  random = Math.random,
): number[] {
  const all = byFreshness(lastSeen, licence, random, category);
  const driving = all.filter((i) => !isTheory(SCENARIOS[i]));
  const theory = all.filter((i) => isTheory(SCENARIOS[i]));
  const order: number[] = [];
  while (driving.length || theory.length) {
    for (let k = 0; k < THEORY_EVERY - 1 && driving.length; k++) order.push(driving.shift()!);
    if (theory.length) order.push(theory.shift()!);
  }
  return order;
}
