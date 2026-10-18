import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const BUS_U = HW + 1.7;
const BUS_V = 27;

/** Buss som blinker ut fra holdeplass på veg med fartsgrense 50. */
export const bussHoldeplass: Scenario = {
  id: "buss-holdeplass",
  title: "Buss ved holdeplass",
  topic: "buss",
  difficulty: 2,
  road: { type: "rett" },
  roadExtras: [{ type: "busslomme", from: 12, to: 42 }],
  signs: [{ id: "fart", code: "362", value: 50, pos: [HW + 1.5, 6], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "buss",
      type: "buss",
      name: "Bussen",
      pos: [BUS_U, BUS_V],
      heading: "N",
      color: "#ff8a65",
      indicator: "left",
      route: {
        turn: "pullout",
        points: [
          [BUS_U, BUS_V],
          [BUS_U, BUS_V + 6],
          [LANE / 2, BUS_V + 16],
          [LANE / 2, BUS_V + 40],
        ],
      },
    },
  ],
  decor: [
    { type: "hus", pos: [16, 20] },
    { type: "hus", pos: [-14, 30] },
    { type: "tre", pos: [-10, 6] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "buss-slippe",
      type: "yesno",
      prompt: "Bussen blinker til venstre for å kjøre ut fra holdeplassen. Må du slippe den ut?",
      correct: true,
      explanation:
        "På veg med fartsgrense 60 km/t eller lavere har du vikeplikt for buss som gir tegn om å kjøre ut fra holdeplass. Her er fartsgrensen 50 km/t.",
      rule: "Trafikkreglene § 7 nr. 5",
      highlight: ["buss", "fart"],
    },
    {
      id: "buss-80",
      type: "choice",
      prompt: "Når gjelder denne vikeplikten for buss?",
      options: [
        { id: "alltid", text: "Alltid, uansett fartsgrense" },
        { id: "60", text: "På veg med fartsgrense 60 km/t eller lavere" },
        { id: "rush", text: "Bare i rushtiden" },
        { id: "skole", text: "Bare for skolebusser" },
      ],
      correct: "60",
      explanation:
        "Vikeplikten for buss som skal ut fra holdeplass gjelder på veg med fartsgrense 60 km/t eller lavere. Bussføreren skal likevel unngå fare.",
      rule: "Trafikkreglene § 7 nr. 5",
      highlight: ["fart"],
    },
  ],
};
