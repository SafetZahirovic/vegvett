import { HW } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 30;

/** Forkjørsvegen slutter før et uregulert kryss: høyreregelen gjelder igjen. */
export const sluttForkjorsveg: Scenario = {
  id: "slutt-forkjorsveg",
  title: "Slutt på forkjørsveg",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [{ id: "slutt", code: "208", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Den gule bilen (fra høyre)",
      ...junctionStart("E", AT, 12),
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 12 }),
    },
  ],
  decor: [
    { type: "hus", pos: [15, 14] },
    { type: "tre", pos: [-10, 14] },
    { type: "tre", pos: [-12, 44] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "slutt-betydning",
      type: "choice",
      prompt: "Hva betyr skiltet du nettopp har passert?",
      hidesSign: "slutt",
      options: [
        { id: "forkjorsveg", text: "Forkjørsveg" },
        { id: "slutt", text: "Slutt på forkjørsveg" },
        { id: "vikeplikt", text: "Vikeplikt" },
        { id: "fare", text: "Annen fare" },
      ],
      correct: "slutt",
      explanation:
        "Skilt 208 Slutt på forkjørsveg: forkjørsvegen slutter her. Etterpå gjelder de vanlige vikepliktreglene.",
      rule: "Skiltforskriften § 6 (skilt 208)",
      highlight: ["slutt"],
    },
    {
      id: "slutt-hvem-viker",
      type: "choice",
      prompt: "Krysset har ingen skilt. Hvem har vikeplikt?",
      options: [
        { id: "du", text: "Du, for den gule bilen fra høyre" },
        { id: "gul", text: "Den gule bilen, for deg" },
        { id: "ingen", text: "Ingen – den som kommer først, kjører først" },
        { id: "begge", text: "Begge må stanse helt" },
      ],
      correct: "du",
      explanation:
        "Forkjørsvegen er slutt, og krysset er uregulert. Da gjelder høyreregelen: du har vikeplikt for den gule bilen som kommer fra høyre.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["slutt", "fra-hoyre"],
    },
  ],
};
