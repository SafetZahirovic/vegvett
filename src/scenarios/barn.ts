import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Skolevei: barn langs og over vegen. */
export const barn: Scenario = {
  id: "barn",
  title: "Barn ved skolen",
  topic: "skilt",
  difficulty: 1,
  road: { type: "rett" },
  roadExtras: [{ type: "sykkelveg", side: "left" }],
  signs: [
    { id: "barn-skilt", code: "142", pos: [HW + 1.5, 8], facing: "S" },
    { id: "fart", code: "362", value: 30, pos: [HW + 1.5, 14], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  pedestrians: [
    {
      id: "barn-1",
      name: "Barnet som springer",
      pos: [HW + 1.2, 27],
      heading: "W",
      color: "#ffd166",
      route: drive([HW + 1.2, 27], "W", [["fwd", 2 * HW + 4]]),
    },
    { id: "barn-2", name: "Barnet på gang- og sykkelvegen", pos: [-HW - 4.3, 22], heading: "N", color: "#9be7ff" },
  ],
  decor: [
    { type: "hus", pos: [17, 26], size: 1.2 },
    { type: "tre", pos: [-16, 12] },
    { type: "tre", pos: [12, 8] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "barn-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "barn-skilt",
      options: [
        { id: "gangfelt", text: "Gangfelt" },
        { id: "barn", text: "Barn – sted der barn ofte ferdes" },
        { id: "gangveg", text: "Gangveg" },
        { id: "lekeplass", text: "Lekeplass – kjøring forbudt" },
      ],
      correct: "barn",
      explanation: "Skilt 142 Barn varsler et sted der barn ofte ferdes, for eksempel ved skole eller lekeplass.",
      rule: "Skiltforskriften § 4 (skilt 142)",
      highlight: ["barn-skilt"],
    },
    {
      id: "barn-hva",
      type: "click",
      prompt: "Klikk på den som er størst fare for at du kan treffe.",
      correct: "barn-1",
      explanation:
        "Barnet ved vegkanten er på vei ut i vegen. Barn kan plutselig springe ut – senk farten og vær klar til å stanse.",
      rule: "Vegtrafikkloven § 3",
      highlight: ["barn-1"],
    },
  ],
};
