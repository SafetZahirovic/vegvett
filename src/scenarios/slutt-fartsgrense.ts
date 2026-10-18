import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Slutt på særskilt fartsgrense: den generelle grensen gjelder. */
export const sluttFartsgrense: Scenario = {
  id: "slutt-fartsgrense",
  title: "Slutt på fartsgrense",
  topic: "fart",
  difficulty: 2,
  road: { type: "rett" },
  signs: [{ id: "slutt", code: "364", value: 60, pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "tre", pos: [-10, 12] },
    { type: "tre", pos: [12, 26] },
    { type: "tre", pos: [-12, 36], size: 1.2 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "sf-grense",
      type: "choice",
      prompt: "Du kjører utenfor tettbygd strøk og passerer skiltet. Hva er fartsgrensen nå?",
      options: [
        { id: "50", text: "50 km/t" },
        { id: "60", text: "60 km/t" },
        { id: "80", text: "80 km/t" },
        { id: "90", text: "90 km/t" },
      ],
      correct: "80",
      explanation:
        "Skilt 364 opphever den særskilte grensen på 60. Da gjelder den generelle fartsgrensen: 80 km/t utenfor tettbygd strøk.",
      rule: "Vegtrafikkloven § 6 annet ledd, skiltforskriften § 8 (skilt 364)",
      highlight: ["slutt"],
    },
    {
      id: "sf-tettbygd",
      type: "choice",
      prompt: "Hva er den generelle fartsgrensen i tettbygd strøk når ingen annen er skiltet?",
      options: [
        { id: "30", text: "30 km/t" },
        { id: "40", text: "40 km/t" },
        { id: "50", text: "50 km/t" },
        { id: "60", text: "60 km/t" },
      ],
      correct: "50",
      explanation: "Uten annen skilting er fartsgrensen 50 km/t i tettbygd strøk og 80 km/t utenfor.",
      rule: "Vegtrafikkloven § 6 annet ledd",
      highlight: [],
    },
  ],
};
