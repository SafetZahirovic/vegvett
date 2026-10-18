import { HW } from "../scene/road";
import { junctionRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 26;

/** Påbudt kjøreretning: du må svinge til høyre. */
export const pabudtKjoreretning: Scenario = {
  id: "pabudt-kjoreretning",
  title: "Påbudt kjøreretning",
  topic: "skilt",
  difficulty: 1,
  road: { type: "x-kryss", at: AT },
  signs: [{ id: "pabud", code: "402.1", pos: [HW + 1.5, AT - HW - 2], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "hus", pos: [-16, 12] },
    { type: "tre", pos: [12, 10] },
    { type: "tre", pos: [-12, 42] },
  ],
  player: { indicator: "right", route: junctionRoute({ from: "S", turn: "right", at: AT, start: AT }) },
  questions: [
    {
      id: "pk-skilt",
      type: "choice",
      prompt: "Hva betyr det blå skiltet med pil?",
      hidesSign: "pabud",
      options: [
        { id: "pabudt", text: "Du må kjøre til høyre i krysset" },
        { id: "anbefalt", text: "Anbefalt kjøreretning til høyre" },
        { id: "envei", text: "Enveiskjørt veg til høyre" },
        { id: "omkjoring", text: "Omkjøring" },
      ],
      correct: "pabudt",
      explanation: "Blå runde skilt er påbudsskilt. 402.1 Påbudt kjøreretning betyr at du må kjøre til høyre.",
      rule: "Skiltforskriften § 10 (skilt 402)",
      highlight: ["pabud"],
    },
    {
      id: "pk-rett",
      type: "yesno",
      prompt: "Kan du kjøre rett fram i dette krysset?",
      correct: false,
      explanation: "Påbudet gjelder: du må svinge til høyre.",
      rule: "Skiltforskriften § 10 (skilt 402)",
      highlight: ["pabud"],
    },
  ],
};
