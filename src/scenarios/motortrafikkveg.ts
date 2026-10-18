import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Motortrafikkveg: bare raske nok motorvogner. */
export const motortrafikkveg: Scenario = {
  id: "motortrafikkveg",
  title: "Motortrafikkveg",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  centerLine: [{ type: "sperrelinje" }],
  signs: [{ id: "mtv-skilt", code: "503", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "foran",
      type: "personbil",
      name: "Bilen foran",
      pos: [LANE / 2, 24],
      heading: "N",
      color: "#b8c4d6",
      route: drive([LANE / 2, 24], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-11, 14] },
    { type: "tre", pos: [12, 28] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mt-skilt",
      type: "choice",
      prompt: "Hva betyr det blå skiltet med bilsymbol?",
      hidesSign: "mtv-skilt",
      options: [
        { id: "mtv", text: "Motortrafikkveg" },
        { id: "motorveg", text: "Motorveg" },
        { id: "parkering", text: "Parkering for bil" },
        { id: "bil", text: "Påbudt for bil" },
      ],
      correct: "mtv",
      explanation: "Skilt 503 Motortrafikkveg viser at motortrafikkvegen begynner.",
      rule: "Skiltforskriften § 12 (skilt 503)",
      highlight: ["mtv-skilt"],
    },
    {
      id: "mt-moped",
      type: "yesno",
      prompt: "Kan du kjøre moped på motortrafikkveg?",
      correct: false,
      explanation:
        "Bare motorvogner som kan og lovlig kan kjøre minst 40 km/t på flat veg, er tillatt. Moped er ikke tillatt.",
      rule: "Trafikkreglene § 4 nr. 2",
      highlight: ["mtv-skilt"],
    },
  ],
};
