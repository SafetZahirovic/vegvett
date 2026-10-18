import { HW } from "../scene/road";
import { junctionRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 26;

/** Svingeforbud til venstre: du svinger til høyre i stedet. */
export const svingeforbud: Scenario = {
  id: "svingeforbud",
  title: "Svingeforbud",
  topic: "skilt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [{ id: "forbud", code: "330.2", pos: [HW + 1.5, AT - HW - 3], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "hus", pos: [-16, 10] },
    { type: "tre", pos: [12, 12] },
    { type: "hus", pos: [17, 42] },
  ],
  player: { indicator: "right", route: junctionRoute({ from: "S", turn: "right", at: AT, start: AT }) },
  questions: [
    {
      id: "sv-skilt",
      type: "choice",
      prompt: "Hva betyr skiltet foran krysset?",
      hidesSign: "forbud",
      options: [
        { id: "venstre", text: "Svingeforbud til venstre" },
        { id: "hoyre", text: "Svingeforbud til høyre" },
        { id: "pabudt", text: "Påbudt å svinge til venstre" },
        { id: "vending", text: "Vendingsforbud" },
      ],
      correct: "venstre",
      explanation:
        "Skilt 330.2 Svingeforbud forbyr å svinge til venstre i krysset der skiltet står (eller første kryss etter).",
      rule: "Skiltforskriften § 8 (skilt 330)",
      highlight: ["forbud"],
    },
    {
      id: "sv-hvor",
      type: "choice",
      prompt: "Hvor kan du kjøre i krysset?",
      options: [
        { id: "rett-hoyre", text: "Rett fram eller til høyre" },
        { id: "venstre", text: "Bare til venstre" },
        { id: "alle", text: "Hvor du vil, krysset er uregulert" },
        { id: "rett", text: "Bare rett fram" },
      ],
      correct: "rett-hoyre",
      explanation: "Bare venstresving er forbudt. Du kan kjøre rett fram eller svinge til høyre.",
      rule: "Skiltforskriften § 8 (skilt 330)",
      highlight: ["forbud"],
    },
  ],
};
