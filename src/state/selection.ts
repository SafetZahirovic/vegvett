import { SCENARIOS } from "../scenarios";
import type { Topic } from "../scenarios/types";
import { errorRate, type TopicStat } from "./progress";

/** Vekt for temaer som ikke er prøvd ennå (litt over middels, så de kommer tidlig). */
const UNSEEN_ERROR_RATE = 0.4;
/** Hvor mye feilandelen trekker opp sannsynligheten. 1 + 4 × 100 % feil = 5 ganger så ofte. */
const ERROR_WEIGHT = 4;

/**
 * Velger et scenario tilfeldig, vektet mot temaer spilleren har svart feil på.
 * `exclude` er scenario-id-er som ikke skal velges (f.eks. de siste som er spilt).
 */
export function pickScenario(
  topics: Partial<Record<Topic, TopicStat>>,
  exclude: Set<string>,
  random = Math.random,
): number {
  let candidates = SCENARIOS.map((s, i) => ({ s, i })).filter(({ s }) => !exclude.has(s.id));
  if (candidates.length === 0) candidates = SCENARIOS.map((s, i) => ({ s, i }));
  const weights = candidates.map(({ s }) => 1 + ERROR_WEIGHT * (errorRate(topics[s.topic]) ?? UNSEEN_ERROR_RATE));
  let r = random() * weights.reduce((a, b) => a + b, 0);
  for (let k = 0; k < candidates.length; k++) {
    r -= weights[k];
    if (r <= 0) return candidates[k].i;
  }
  return candidates[candidates.length - 1].i;
}

/** Stokker scenarioer til en prøve (uten gjentakelser). */
export function shuffledScenarioOrder(random = Math.random): number[] {
  const order = SCENARIOS.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
