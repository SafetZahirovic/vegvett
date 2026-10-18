import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Fareskilt foran en sving: tilpass farten selv om fartsgrensen er høyere. */
export const farligSving: Scenario = {
  id: "farlig-sving",
  title: "Farlig sving",
  topic: "fart",
  difficulty: 1,
  road: { type: "rett" },
  signs: [
    { id: "sving", code: "100.1", pos: [HW + 1.5, 14], facing: "S" },
    { id: "fart", code: "362", value: 80, pos: [HW + 1.5, 5], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  decor: [
    { type: "tre", pos: [-9, 8] },
    { type: "tre", pos: [-10, 20], size: 1.2 },
    { type: "tre", pos: [10, 26] },
    { type: "tre", pos: [12, 40], size: 1.3 },
    { type: "tre", pos: [-12, 42] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "sving-betydning",
      type: "choice",
      prompt: "Hva varsler den røde trekanten foran deg?",
      hidesSign: "sving",
      options: [
        { id: "sving", text: "Farlig sving til høyre" },
        { id: "vikeplikt", text: "Vikeplikt" },
        { id: "kryss", text: "Kryss med vikeplikt fra høyre" },
        { id: "smal", text: "Smalere veg" },
      ],
      correct: "sving",
      explanation: "Skilt 100 Farlig sving varsler en sving som kan være vanskelig å se eller kjøre gjennom.",
      rule: "Skiltforskriften § 4 (skilt 100)",
      highlight: ["sving"],
    },
    {
      id: "sving-fart",
      type: "yesno",
      prompt: "Fartsgrensen er 80 km/t. Bør du likevel senke farten før svingen?",
      correct: true,
      explanation:
        "Farten skal alltid tilpasses vegen, sikten og forholdene. Fartsgrensen er bare den øvre grensen.",
      rule: "Vegtrafikkloven § 6 første ledd",
      highlight: ["sving", "fart"],
    },
  ],
};
