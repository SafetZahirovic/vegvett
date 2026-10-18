import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

export const landevei: Scenario = {
  id: "landevei-80",
  title: "Landevei",
  topic: "fart",
  difficulty: 1,
  road: { type: "rett" },
  signs: [{ id: "fart", code: "362", value: 80, pos: [HW + 1.5, 16], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-LANE / 2, 34],
      heading: "S",
      color: "#ff8a65",
      route: drive([-LANE / 2, 34], "S", [["fwd", 60]]),
    },
    {
      id: "syklist",
      type: "sykkel",
      name: "Syklisten",
      pos: [HW - 0.8, 22],
      heading: "N",
      color: "#c3f584",
      route: drive([HW - 0.8, 22], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-9, 6] },
    { type: "tre", pos: [-12, 14], size: 1.2 },
    { type: "tre", pos: [10, 28] },
    { type: "tre", pos: [13, 36], size: 0.8 },
    { type: "hus", pos: [-16, 30] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "fart-betydning",
      type: "choice",
      prompt: "Hva betyr skiltet til høyre for vegen?",
      hidesSign: "fart",
      options: [
        { id: "anbefalt", text: "Anbefalt fart er 80 km/t" },
        { id: "hoyeste", text: "Høyeste tillatte fart er 80 km/t" },
        { id: "minste", text: "Du må holde minst 80 km/t" },
        { id: "tunge", text: "Fartsgrensen gjelder bare for tunge kjøretøy" },
      ],
      correct: "hoyeste",
      explanation:
        "Skilt 362 Fartsgrense viser høyeste tillatte fart. Den gjelder fra skiltet og til en ny fartsgrense er skiltet.",
      rule: "Skiltforskriften § 8 (skilt 362)",
      highlight: ["fart"],
    },
    {
      id: "fart-forhold",
      type: "yesno",
      prompt: "Er det alltid greit å kjøre 80 km/t når skiltet viser 80?",
      correct: false,
      explanation:
        "Fartsgrensen er en øvre grense. Du skal alltid tilpasse farten etter forholdene, for eksempel sikt, føre og trafikk.",
      rule: "Vegtrafikkloven § 6 første ledd",
      highlight: ["fart", "motende"],
    },
  ],
};
