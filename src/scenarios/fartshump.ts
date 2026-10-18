import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Fartshump i boligområde. */
export const fartshump: Scenario = {
  id: "fartshump",
  title: "Fartshump",
  topic: "fart",
  difficulty: 1,
  road: { type: "rett" },
  signs: [
    { id: "hump-skilt", code: "109", pos: [HW + 1.5, 10], facing: "S" },
    { id: "fart", code: "362", value: 30, pos: [HW + 1.5, 4], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  pedestrians: [{ id: "gaaende", name: "Gående på fortauet", pos: [-HW - 1.5, 22], heading: "S" }],
  decor: [
    { type: "hus", pos: [15, 14] },
    { type: "hus", pos: [-15, 28] },
    { type: "hus", pos: [16, 38], size: 0.9 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "fh-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "hump-skilt",
      options: [
        { id: "hump", text: "Fartshump" },
        { id: "ujevn", text: "Ujevn veg" },
        { id: "bakketopp", text: "Bakketopp" },
        { id: "ras", text: "Rasfare" },
      ],
      correct: "hump",
      explanation: "Skilt 109 Fartshump varsler fartshump i vegen.",
      rule: "Skiltforskriften § 4 (skilt 109)",
      highlight: ["hump-skilt"],
    },
    {
      id: "fh-handling",
      type: "choice",
      prompt: "Hva gjør du før fartshumpen?",
      options: [
        { id: "senk", text: "Senker farten i god tid" },
        { id: "gass", text: "Gir gass, så bilen flyter over" },
        { id: "venstre", text: "Kjører rundt den i motsatt felt" },
        { id: "brems", text: "Bremser hardt oppå humpen" },
      ],
      correct: "senk",
      explanation: "Fartshumper skal få ned farten. Senk farten i god tid og hold fartsgrensen på 30 km/t.",
      rule: "Vegtrafikkloven § 6 første ledd, skiltforskriften § 8 (skilt 362)",
      highlight: ["hump-skilt", "fart"],
    },
  ],
};
