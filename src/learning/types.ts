import type { Licence, Topic } from "../scenarios/types";

/** En egen, kort læringsside. Tekstene er skrevet for Vegvett og bygger på kildene som oppgis. */
export type Article = {
  id: string;
  title: string;
  /** Hovedtema i oversikten, f.eks. «Vikeplikt og kryss». */
  group: string;
  /** Rekkefølge innen gruppen. */
  order?: number;
  /** Klasser artikkelen gjelder for. Utelatt = både bil og MC. */
  licences?: Licence[];
  /** Spilltemaer artikkelen hører til (brukes til «Les mer» og «Øv på dette»). */
  topics?: Topic[];
  intro: string;
  sections: { heading: string; text?: string; bullets?: string[] }[];
  sources: { label: string; url?: string }[];
};
