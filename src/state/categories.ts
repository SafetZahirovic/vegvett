import { SCENARIOS } from "../scenarios";
import type { Licence, Scenario, Topic } from "../scenarios/types";

/** Kategorier spilleren kan øve, ta prøve eller få guidet kjøring i. Hver kategori samler noen temaer. */
export type Category = { id: string; title: string; topics: Topic[] };

export const CATEGORIES: Category[] = [
  { id: "vikeplikt", title: "Vikeplikt og kryss", topics: ["vikeplikt", "rundkjoring", "gangfelt", "utrykning", "buss"] },
  { id: "skilt", title: "Skilt og oppmerking", topics: ["skilt", "oppmerking"] },
  { id: "fart", title: "Fart og forbikjøring", topics: ["fart", "forbikjoring"] },
  { id: "trafikanter", title: "Syklister og dyr", topics: ["sykkel", "dyr"] },
  { id: "mennesket", title: "Mennesket og sikkerhet", topics: ["mennesket", "sikkerhet"] },
  { id: "kjoretoy", title: "Kjøretøy og teknikk", topics: ["kjoretoy"] },
  { id: "ansvar", title: "Lover og ansvar", topics: ["ansvar"] },
  { id: "motorsykkel", title: "Motorsykkel", topics: ["motorsykkel"] },
];

export const categoryById = (id: string | null) => CATEGORIES.find((c) => c.id === id) ?? null;

/** Hører scenarioet til kategorien? `null` = alle. */
export const inCategory = (s: Scenario, category: string | null) =>
  category === null || !!categoryById(category)?.topics.includes(s.topic);

/** Antall scenarioer i kategorien for klassen. */
export const categoryCount = (category: string | null, licence: Licence) =>
  SCENARIOS.filter((s) => (s.licences ?? ["A", "B"]).includes(licence) && inCategory(s, category)).length;
