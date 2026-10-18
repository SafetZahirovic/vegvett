import type { Scenario } from "./types";

/**
 * Alle scenarioer hentes automatisk fra filene i denne mappen: et nytt scenario
 * legges til ved å lage en ny datafil som eksporterer et `Scenario`-objekt.
 */
const modules = import.meta.glob<Record<string, unknown>>(["./*.ts", "!./index.ts", "!./types.ts", "!./routes.ts"], {
  eager: true,
});

const isScenario = (x: unknown): x is Scenario =>
  typeof x === "object" && x !== null && "id" in x && "road" in x && "questions" in x;

/** Sortert etter vanskelighetsgrad og tittel, så de enkleste kommer først. */
export const SCENARIOS: Scenario[] = Object.values(modules)
  .flatMap((m) => Object.values(m).filter(isScenario))
  .sort((a, b) => a.difficulty - b.difficulty || a.title.localeCompare(b.title, "nb"));

if (import.meta.env.DEV) {
  const ids = SCENARIOS.map((s) => s.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) console.warn("Scenario-id-er brukt flere ganger:", dupes);
}
