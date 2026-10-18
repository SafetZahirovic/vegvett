import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Sau på beite langs vegen. */
export const sau: Scenario = {
  id: "sau",
  title: "Sau langs vegen",
  topic: "dyr",
  difficulty: 1,
  road: { type: "rett" },
  signs: [{ id: "sau-skilt", code: "146.5", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [],
  animals: [
    { id: "sau-1", type: "sau", name: "Sauen på vegskulderen", pos: [HW + 1.1, 20], heading: "S" },
    { id: "sau-2", type: "sau", name: "Sauen ved grøfta", pos: [HW + 2.8, 23], heading: "W" },
    {
      id: "sau-3",
      type: "sau",
      name: "Sauen som krysser",
      pos: [-HW - 1.5, 30],
      heading: "E",
      route: drive([-HW - 1.5, 30], "E", [["fwd", 2 * HW + 3]]),
    },
  ],
  decor: [
    { type: "hus", pos: [-18, 22], size: 0.8 },
    { type: "tre", pos: [12, 38] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "sau-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "sau-skilt",
      options: [
        { id: "sau", text: "Sau" },
        { id: "ku", text: "Storfe" },
        { id: "hjort", text: "Hjort" },
        { id: "beite", text: "Beiteområde – kjøring forbudt" },
      ],
      correct: "sau",
      explanation: "Skilt 146.5 Sau varsler at sau ofte ferdes over eller langs vegen.",
      rule: "Skiltforskriften § 4 (skilt 146.5)",
      highlight: ["sau-skilt"],
    },
    {
      id: "sau-uforutsigbar",
      type: "yesno",
      prompt: "Må du regne med at sauene kan gå ut i vegen uten forvarsel?",
      correct: true,
      explanation: "Dyr ser ikke trafikken som vi gjør. Senk farten og vær klar til å stanse.",
      rule: "Vegtrafikkloven § 3",
      highlight: ["sau-1", "sau-2", "sau-3"],
    },
  ],
};
