import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Stans forbudt: heller ikke kort stans er lov. */
export const stansForbudt: Scenario = {
  id: "stans-forbudt",
  title: "Stans forbudt",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  signs: [{ id: "stans", code: "370", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [],
  pedestrians: [{ id: "venter", name: "Vennen som venter", pos: [HW + 1.4, 22], heading: "W" }],
  decor: [
    { type: "hus", pos: [15, 16] },
    { type: "hus", pos: [-14, 30] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "sf-skilt",
      type: "choice",
      prompt: "Hva betyr det runde skiltet med rødt kryss?",
      hidesSign: "stans",
      options: [
        { id: "parkering", text: "Parkering forbudt" },
        { id: "stans", text: "Stans forbudt" },
        { id: "innkjoring", text: "Innkjøring forbudt" },
        { id: "vending", text: "Vendingsforbud" },
      ],
      correct: "stans",
      explanation: "Skilt 370 Stans forbudt har et rødt kryss på blå bunn.",
      rule: "Skiltforskriften § 8 (skilt 370)",
      highlight: ["stans"],
    },
    {
      id: "sf-slippe-av",
      type: "yesno",
      prompt: "Kan du stanse kort her for å la vennen din sette seg inn?",
      correct: false,
      explanation:
        "Stans forbudt betyr at du ikke kan stanse i det hele tatt, heller ikke kort for av- og påstigning. Kjør videre til et sted der det er lov.",
      rule: "Skiltforskriften § 8 (skilt 370)",
      highlight: ["stans", "venter"],
    },
  ],
};
