import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Elg ved vegkanten på landevei. */
export const elg: Scenario = {
  id: "elg",
  title: "Elg ved vegen",
  topic: "dyr",
  difficulty: 1,
  road: { type: "rett" },
  signs: [{ id: "elg-skilt", code: "146.1", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [],
  animals: [
    {
      id: "elgen",
      type: "elg",
      name: "Elgen",
      pos: [HW + 5, 26],
      heading: "W",
      route: drive([HW + 5, 26], "W", [["fwd", 2 * HW + 12]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-8, 6] },
    { type: "tre", pos: [-10, 16], size: 1.2 },
    { type: "tre", pos: [-9, 30] },
    { type: "tre", pos: [11, 14], size: 1.1 },
    { type: "tre", pos: [13, 34], size: 1.3 },
    { type: "tre", pos: [10, 44] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "elg-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "elg-skilt",
      options: [
        { id: "hjort", text: "Hjort" },
        { id: "elg", text: "Elg" },
        { id: "rein", text: "Rein" },
        { id: "ku", text: "Storfe" },
      ],
      correct: "elg",
      explanation: "Skilt 146.1 Elg varsler at elg ofte krysser eller går langs vegen her.",
      rule: "Skiltforskriften § 4 (skilt 146.1)",
      highlight: ["elg-skilt"],
    },
    {
      id: "elg-handling",
      type: "choice",
      prompt: "En elg står ved vegkanten foran deg. Hva gjør du?",
      options: [
        { id: "senk", text: "Senker farten og er klar til å stanse – elgen kan gå ut i vegen" },
        { id: "tut", text: "Tuter og holder farten" },
        { id: "fort", text: "Kjører fort forbi før den rekker å gå ut" },
        { id: "fjernlys", text: "Blinker med fjernlyset og fortsetter som før" },
      ],
      correct: "senk",
      explanation:
        "Dyr er uforutsigbare. Du skal være aktpågivende og varsom, så senk farten og vær klar til å stanse.",
      rule: "Vegtrafikkloven § 3",
      highlight: ["elgen"],
    },
    {
      id: "elg-ulykke",
      type: "yesno",
      prompt: "Du kolliderer med en elg. Må du stanse?",
      correct: true,
      explanation: "Den som er innblandet i en trafikkulykke, skal straks stanse og hjelpe skadde – også dyr.",
      rule: "Vegtrafikkloven § 12",
      highlight: ["elgen"],
    },
  ],
};
