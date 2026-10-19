import type { Licence, Topic } from "../scenarios/types";
import type { Article } from "./types";

/** Alle læringssider hentes automatisk fra learning/articles/*.ts. */
const modules = import.meta.glob<Record<string, unknown>>("./articles/*.ts", { eager: true });

const isArticle = (x: unknown): x is Article =>
  typeof x === "object" && x !== null && "sections" in x && "intro" in x && "group" in x;

/** Rekkefølgen på hovedtemaene, som i Statens vegvesens temaliste. */
export const GROUP_ORDER = [
  "Vikeplikt og kryss",
  "Trafikkskilt og oppmerking",
  "Fart, plassering og forbikjøring",
  "Mennesket i trafikken",
  "Kjøretøy og teknikk",
  "Sikkerhet og førstehjelp",
  "Lover og ansvar",
  "Motorsykkel",
];

export const ARTICLES: Article[] = Object.values(modules)
  .flatMap((m) => Object.values(m).filter(isArticle))
  .sort(
    (a, b) =>
      GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) ||
      (a.order ?? 99) - (b.order ?? 99) ||
      a.title.localeCompare(b.title, "nb"),
  );

export const articlesFor = (licence: Licence) => ARTICLES.filter((a) => (a.licences ?? ["A", "B"]).includes(licence));

/** Første artikkel som handler om et spilltema. */
export const articleForTopic = (topic: Topic, licence: Licence) =>
  articlesFor(licence).find((a) => a.topics?.includes(topic));
