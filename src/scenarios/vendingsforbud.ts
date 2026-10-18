import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Vendingsforbud: ikke snu her. */
export const vendingsforbud: Scenario = {
  id: "vendingsforbud",
  title: "Vendingsforbud",
  topic: "skilt",
  difficulty: 1,
  road: { type: "rett" },
  signs: [{ id: "vending", code: "332", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "tre", pos: [-9, 12] },
    { type: "hus", pos: [16, 28] },
    { type: "tre", pos: [-11, 36] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "vf-skilt",
      type: "choice",
      prompt: "Hva betyr skiltet?",
      hidesSign: "vending",
      options: [
        { id: "vending", text: "Vendingsforbud" },
        { id: "sving", text: "Svingeforbud til venstre" },
        { id: "rundkjoring", text: "Rundkjøring" },
        { id: "blindveg", text: "Blindveg" },
      ],
      correct: "vending",
      explanation: "Skilt 332 Vendingsforbud forbyr å vende (snu) på vegen.",
      rule: "Skiltforskriften § 8 (skilt 332)",
      highlight: ["vending"],
    },
    {
      id: "vf-snu",
      type: "yesno",
      prompt: "Du har kjørt feil. Kan du snu her?",
      correct: false,
      explanation: "Her er det forbudt å vende. Kjør videre til et sted der det er lov å snu.",
      rule: "Skiltforskriften § 8 (skilt 332)",
      highlight: ["vending"],
    },
  ],
};
