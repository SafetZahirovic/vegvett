import { LANE } from "../scene/road";
import { drive } from "./routes";
import type { Decor, Licence, Question, Scenario, Topic } from "./types";

/**
 * Hjelper for kunnskapsscenarioer: en rolig landeveg som ramme rundt spørsmål som ikke
 * handler om en bestemt trafikksituasjon (teknikk, helse, førstehjelp, regler).
 * Hvert besøk trekker inntil tre spørsmål fra potten.
 */
export function knowledge(opts: {
  id: string;
  title: string;
  topic: Topic;
  difficulty?: 1 | 2 | 3;
  licences?: Licence[];
  decor?: Decor[];
  questions: Question[];
}): Scenario {
  return {
    id: opts.id,
    title: opts.title,
    topic: opts.topic,
    kind: "teori",
    difficulty: opts.difficulty ?? 1,
    licences: opts.licences,
    road: { type: "rett" },
    signs: [],
    markings: [],
    vehicles: [],
    decor: opts.decor ?? [
      { type: "tre", pos: [-9, 8] },
      { type: "tre", pos: [11, 18], size: 1.2 },
      { type: "hus", pos: [-16, 28] },
      { type: "tre", pos: [12, 38] },
    ],
    player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
    questions: opts.questions,
  };
}
