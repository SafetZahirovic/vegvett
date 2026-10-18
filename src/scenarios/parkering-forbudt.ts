import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Parkering forbudt: kort stans for av- og påstigning er lov. */
export const parkeringForbudt: Scenario = {
  id: "parkering-forbudt",
  title: "Parkering forbudt",
  topic: "skilt",
  difficulty: 2,
  licences: ["B"],
  road: { type: "rett" },
  signs: [
    { id: "parkering", code: "372", pos: [HW + 1.5, 10], facing: "S" },
    { id: "fart", code: "362", value: 40, pos: [HW + 1.5, 3], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  pedestrians: [{ id: "venter", name: "Vennen som venter", pos: [HW + 1.4, 20], heading: "W" }],
  decor: [
    { type: "hus", pos: [15, 18] },
    { type: "hus", pos: [-14, 26] },
    { type: "hus", pos: [15, 38], size: 0.9 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "pf-skilt",
      type: "choice",
      prompt: "Hva betyr det runde skiltet med én rød skråstrek?",
      hidesSign: "parkering",
      options: [
        { id: "stans", text: "Stans forbudt" },
        { id: "parkering", text: "Parkering forbudt" },
        { id: "innkjoring", text: "Innkjøring forbudt" },
        { id: "motorvogn", text: "Forbudt for motorvogn" },
      ],
      correct: "parkering",
      explanation: "Skilt 372 Parkering forbudt har én rød skråstrek. Skilt 370 Stans forbudt har et rødt kryss.",
      rule: "Skiltforskriften § 8 (skilt 372)",
      highlight: ["parkering"],
    },
    {
      id: "pf-slippe-av",
      type: "yesno",
      prompt: "Kan du stanse kort her for å la vennen din sette seg inn i bilen?",
      correct: true,
      explanation:
        "Kort stans for av- og påstigning eller av- og pålessing regnes ikke som parkering. Det er derfor lov der det bare er parkering forbudt.",
      rule: "Trafikkreglene § 1 nr. 1 k, skiltforskriften § 8 (skilt 372)",
      highlight: ["parkering", "venter"],
    },
    {
      id: "pf-definisjon",
      type: "choice",
      prompt: "Hva regnes ikke som parkering?",
      options: [
        { id: "kort", text: "Kort stans for av- og påstigning eller av- og pålessing" },
        { id: "vente", text: "Å vente i bilen på en venn" },
        { id: "handle", text: "Å la bilen stå i ti minutter mens du handler" },
        { id: "motor", text: "All stans der motoren går" },
      ],
      correct: "kort",
      explanation:
        "Parkering er all hensetting av kjøretøy, også når føreren blir sittende. Unntaket er kort stans for av- og påstigning eller av- og pålessing.",
      rule: "Trafikkreglene § 1 nr. 1 k",
      highlight: ["parkering"],
    },
  ],
};
