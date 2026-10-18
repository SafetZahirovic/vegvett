import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const AT = 26;

/** Blindveg: sidevegen har ingen gjennomkjøring. */
export const blindveg: Scenario = {
  id: "blindveg",
  title: "Blindveg",
  topic: "skilt",
  difficulty: 1,
  road: { type: "t-kryss", at: AT, branch: "right" },
  signs: [{ id: "blindveg-skilt", code: "527.1", pos: [HW + 1.5, AT - HW - 2], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "hus", pos: [22, 20] },
    { type: "hus", pos: [24, 36] },
    { type: "tre", pos: [-10, 14] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "bv-skilt",
      type: "choice",
      prompt: "Hva betyr det blå skiltet ved sidevegen?",
      hidesSign: "blindveg-skilt",
      options: [
        { id: "blindveg", text: "Blindveg – ingen gjennomkjøring" },
        { id: "forbudt", text: "Innkjøring forbudt" },
        { id: "parkering", text: "Parkering" },
        { id: "envei", text: "Enveiskjøring" },
      ],
      correct: "blindveg",
      explanation: "Skilt 527 Blindveg viser at vegen ikke har gjennomkjøring.",
      rule: "Skiltforskriften § 12 (skilt 527)",
      highlight: ["blindveg-skilt"],
    },
    {
      id: "bv-gjennom",
      type: "yesno",
      prompt: "Kan du kjøre inn sidevegen for å komme fram til en annen veg?",
      correct: false,
      explanation: "En blindveg ender uten forbindelse videre. Du må snu og kjøre samme veg tilbake.",
      rule: "Skiltforskriften § 12 (skilt 527)",
      highlight: ["blindveg-skilt"],
    },
  ],
};
