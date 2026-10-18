import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** MC: kollektivfelt, sykkelfelt og fortau. */
export const mcKollektivfelt: Scenario = {
  id: "mc-kollektivfelt",
  title: "MC: kollektivfelt",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "rett" },
  roadExtras: [{ type: "kollektivfelt", from: 6, to: 120 }],
  signs: [{ id: "kollektiv-skilt", code: "508.1", pos: [HW + 4.8, 4], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "buss",
      type: "buss",
      name: "Bussen i kollektivfeltet",
      pos: [HW + 2, 30],
      heading: "N",
      color: "#ff8a65",
      route: drive([HW + 2, 30], "N", [["fwd", 30]]),
    },
    {
      id: "ko",
      type: "personbil",
      name: "Bilen foran deg",
      pos: [LANE / 2, 14],
      heading: "N",
      color: "#b8c4d6",
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 14] },
    { type: "hus", pos: [-15, 34] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mck-kollektiv",
      type: "yesno",
      prompt: "Kan du kjøre tohjuls MC uten sidevogn i kollektivfeltet?",
      correct: true,
      explanation:
        "Tohjuls motorsykkel uten sidevogn kan bruke kollektivfelt, med mindre skilt sier noe annet.",
      rule: "Trafikkreglene § 5 nr. 2",
      highlight: ["kollektiv-skilt"],
    },
    {
      id: "mck-sykkelfelt",
      type: "yesno",
      prompt: "Kan du bruke et sykkelfelt for å komme forbi køen?",
      correct: false,
      explanation: "Andre kjørende enn syklende må ikke bruke sykkelveg eller sykkelfelt.",
      rule: "Trafikkreglene § 5 nr. 2",
      highlight: [],
    },
    {
      id: "mck-fortau",
      type: "yesno",
      prompt: "Kan du parkere MC-en på fortauet når du er framme?",
      correct: false,
      explanation:
        "Det er forbudt å stanse helt eller delvis på fortau, gangveg eller sykkelveg. Unntaket for parkering på fortau gjelder bare sykkel.",
      rule: "Trafikkreglene § 17 nr. 1 c",
      highlight: [],
    },
  ],
};
