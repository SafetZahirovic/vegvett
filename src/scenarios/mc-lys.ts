import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** MC: lys. */
export const mcLys: Scenario = {
  id: "mc-lys",
  title: "MC: lys",
  topic: "motorsykkel",
  difficulty: 1,
  licences: ["A"],
  road: { type: "rett" },
  signs: [{ id: "tunnel-skilt", code: "122", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "hus", pos: [-12, 34], size: 1.6 },
    { type: "hus", pos: [12, 34], size: 1.6 },
    { type: "tre", pos: [-10, 12] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mcl-alltid",
      type: "yesno",
      prompt: "Skal du alltid ha lys på når du kjører MC, også midt på dagen?",
      correct: true,
      explanation: "Under kjøring med motorvogn skal fjernlys, nærlys eller godkjent kjørelys alltid være tent.",
      rule: "Trafikkreglene § 15 nr. 1",
      highlight: [],
    },
    {
      id: "mcl-taake",
      type: "yesno",
      prompt: "Kan du ha tåkelys tent sammen med nærlyset i dagslys på MC?",
      correct: true,
      explanation: "Motorsykkel kan ha tåkelys tent sammen med nærlys i dagslys. Det gjør deg lettere å se.",
      rule: "Trafikkreglene § 15 nr. 5",
      highlight: [],
    },
  ],
};
