import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const half = LANE / 2;

/** MC og skilt 334: forbudet gjelder forbikjøring av motorvogn med mer enn to hjul. */
export const mcForbikjoringsforbud: Scenario = {
  id: "mc-forbikjoringsforbud",
  title: "MC: forbikjøringsforbud",
  topic: "motorsykkel",
  difficulty: 3,
  licences: ["A"],
  road: { type: "rett" },
  signs: [{ id: "forbud", code: "334", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "bil-foran",
      type: "personbil",
      name: "Bilen foran deg",
      pos: [half, 18],
      heading: "N",
      color: "#b8c4d6",
      route: drive([half, 18], "N", [["fwd", 30]]),
    },
    {
      id: "bil-bak",
      type: "personbil",
      name: "Bilen bak deg",
      pos: [half, -9],
      heading: "N",
      color: "#ffd166",
      route: drive([half, -9], "N", [["fwd", 6]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-9, 12] },
    { type: "tre", pos: [11, 26] },
  ],
  player: { route: drive([half, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mcf-du",
      type: "yesno",
      prompt: "Du kjører MC. Kan du kjøre forbi bilen foran deg når skilt 334 gjelder?",
      correct: false,
      explanation:
        "Skilt 334 forbyr forbikjøring av motorvogn med mer enn to hjul. Bilen har fire hjul, så du kan ikke kjøre forbi – heller ikke på MC.",
      rule: "Skiltforskriften § 8 (skilt 334)",
      highlight: ["forbud", "bil-foran"],
    },
    {
      id: "mcf-bilen",
      type: "yesno",
      prompt: "Kan bilen bak deg lovlig kjøre forbi deg når skilt 334 gjelder?",
      correct: true,
      explanation:
        "Forbudet gjelder bare forbikjøring av motorvogn med mer enn to hjul. En motorsykkel har to hjul, så den kan passeres – men det må skje trygt.",
      rule: "Skiltforskriften § 8 (skilt 334)",
      highlight: ["forbud", "bil-bak"],
    },
  ],
};
