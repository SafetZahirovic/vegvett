import { HW } from "../scene/road";
import { junctionRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 30;

/** Fartsgrensesone: grensen gjelder også i sidegatene. */
export const fartsgrensesone: Scenario = {
  id: "fartsgrensesone",
  title: "Fartsgrensesone",
  topic: "fart",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [{ id: "sone", code: "366", value: 30, pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [],
  pedestrians: [
    { id: "barn", name: "Barnet ved sidegata", pos: [HW + 6, AT - HW - 1.5], heading: "W", color: "#ffd166" },
  ],
  decor: [
    { type: "hus", pos: [15, 16] },
    { type: "hus", pos: [-15, 18] },
    { type: "hus", pos: [15, 44] },
    { type: "hus", pos: [-15, 44] },
  ],
  player: { indicator: "right", route: junctionRoute({ from: "S", turn: "right", at: AT, start: AT }) },
  questions: [
    {
      id: "fs-skilt",
      type: "choice",
      prompt: "Hva betyr skiltet?",
      hidesSign: "sone",
      options: [
        { id: "sone", text: "Fartsgrensesone – 30 km/t i hele området" },
        { id: "anbefalt", text: "Anbefalt fart 30 km/t" },
        { id: "kort", text: "30 km/t fram til neste kryss" },
        { id: "skole", text: "30 km/t bare når skolen er åpen" },
      ],
      correct: "sone",
      explanation: "Skilt 366 Fartsgrensesone: fartsgrensen gjelder i hele sonen, også i sidegatene.",
      rule: "Skiltforskriften § 8 (skilt 366)",
      highlight: ["sone"],
    },
    {
      id: "fs-sidegate",
      type: "yesno",
      prompt: "Du svinger inn i en sidegate i sonen. Gjelder fortsatt 30 km/t?",
      correct: true,
      explanation: "Fartsgrensen gjelder i hele sonen til du passerer skilt for slutt på fartsgrensesone.",
      rule: "Skiltforskriften § 8 (skilt 366 og 368)",
      highlight: ["sone"],
    },
    {
      id: "fs-slutt",
      type: "choice",
      prompt: "Når slutter fartsgrensen i sonen?",
      options: [
        { id: "skilt", text: "Når du passerer skilt for slutt på fartsgrensesone" },
        { id: "kryss", text: "I første kryss" },
        { id: "500m", text: "Etter 500 meter" },
        { id: "aldri", text: "Den gjelder til du kommer til motorveg" },
      ],
      correct: "skilt",
      explanation: "Sonen gjelder til den oppheves, for eksempel med skilt 368 Slutt på fartsgrensesone.",
      rule: "Skiltforskriften § 8 (skilt 368)",
      highlight: ["sone"],
    },
  ],
};
