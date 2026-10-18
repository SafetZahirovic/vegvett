import { SCENARIOS } from "../scenarios";
import type { Licence, Scenario, Topic } from "../scenarios/types";
import { errorRate, type TopicStat } from "./progress";

/** Vekt for temaer som ikke er prøvd ennå (litt over middels, så de kommer tidlig). */
const UNSEEN_ERROR_RATE = 0.4;
/** Hvor mye feilandelen trekker opp sannsynligheten. 1 + 4 × 100 % feil = 5 ganger så ofte. */
const ERROR_WEIGHT = 4;

/** Andel av scenarioene (de minst nylig sette) som det trekkes fra. Resten venter på tur. */
const FRESH_SHARE = 0.2;
const MIN_POOL = 4;

/** Gjelder scenarioet for valgt klasse? Uten `licences` gjelder det både bil og MC. */
export const forLicence = (s: Scenario, licence: Licence) => (s.licences ?? ["A", "B"]).includes(licence);

/** Scenarioindekser for klassen, sortert fra minst nylig sett (aldri sett først), tilfeldig ved likhet. */
function byFreshness(lastSeen: Record<string, number>, licence: Licence, random: () => number): number[] {
  const tie = new Map(SCENARIOS.map((s) => [s.id, random()]));
  const pool = SCENARIOS.map((_, i) => i).filter((i) => forLicence(SCENARIOS[i], licence));
  return pool.sort((a, b) => {
    const da = lastSeen[SCENARIOS[a].id] ?? 0;
    const db = lastSeen[SCENARIOS[b].id] ?? 0;
    return da - db || tie.get(SCENARIOS[a].id)! - tie.get(SCENARIOS[b].id)!;
  });
}

/**
 * Velger et scenario blant dem du har sett minst nylig (også på tvers av økter), vektet
 * mot temaer du har svart feil på. Slik går alle scenarioene runden før noe gjentas.
 * `exclude` er scenario-id-er som ikke skal velges (f.eks. det som spilles nå).
 */
export function pickScenario(
  topics: Partial<Record<Topic, TopicStat>>,
  exclude: Set<string>,
  lastSeen: Record<string, number> = {},
  licence: Licence = "B",
  random = Math.random,
): number {
  const all = byFreshness(lastSeen, licence, random);
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

/** Rekkefølge for en prøve: scenarioene du har sett minst nylig først, ellers tilfeldig. */
export function shuffledScenarioOrder(
  lastSeen: Record<string, number> = {},
  licence: Licence = "B",
  random = Math.random,
): number[] {
  return byFreshness(lastSeen, licence, random);
}
