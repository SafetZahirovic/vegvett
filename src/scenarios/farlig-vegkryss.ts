import { HW } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 30;

/** Farlig vegkryss: varsler uregulert kryss der høyreregelen gjelder. */
export const farligVegkryss: Scenario = {
  id: "farlig-vegkryss",
  title: "Farlig vegkryss",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [{ id: "kryss-skilt", code: "124", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Bilen fra høyre",
      ...junctionStart("E", AT, 13),
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 13 }),
    },
  ],
  decor: [
    { type: "tre", pos: [-10, 14] },
    { type: "tre", pos: [-12, 44], size: 1.2 },
    { type: "hus", pos: [17, 14] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "fv-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet med et kors?",
      hidesSign: "kryss-skilt",
      options: [
        { id: "forkjor", text: "Forkjørskryss" },
        { id: "farlig", text: "Farlig vegkryss der høyreregelen gjelder" },
        { id: "jernbane", text: "Jernbanekryssing" },
        { id: "sykehus", text: "Sykehus" },
      ],
      correct: "farlig",
      explanation: "Skilt 124 Farlig vegkryss varsler et kryss der den vanlige høyreregelen gjelder.",
      rule: "Skiltforskriften § 4 (skilt 124)",
      highlight: ["kryss-skilt"],
    },
    {
      id: "fv-hvem",
      type: "click",
      prompt: "Klikk på kjøretøyet som skal kjøre først.",
      correct: "fra-hoyre",
      explanation: "Høyreregelen gjelder: du har vikeplikt for bilen som kommer fra høyre.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["fra-hoyre"],
    },
  ],
};
