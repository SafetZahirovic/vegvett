import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** MC: hjelm, verneutstyr og passasjer. Pott med flere spørsmål. */
export const mcVerneutstyr: Scenario = {
  id: "mc-verneutstyr",
  title: "MC: hjelm og passasjer",
  topic: "motorsykkel",
  difficulty: 1,
  licences: ["A"],
  road: { type: "rett" },
  signs: [{ id: "fart", code: "362", value: 60, pos: [HW + 1.5, 12], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "hus", pos: [-15, 10] },
    { type: "tre", pos: [12, 20] },
    { type: "hus", pos: [16, 38] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mcv-utstyr",
      type: "choice",
      prompt: "Hvilket verneutstyr er påbudt ved lov når du kjører MC?",
      options: [
        { id: "hjelm", text: "Godkjent hjelm" },
        { id: "alt", text: "Hjelm, jakke, bukse, hansker og støvler" },
        { id: "hansker", text: "Hjelm og hansker" },
        { id: "ingen", text: "Ingenting – alt er anbefalinger" },
      ],
      correct: "hjelm",
      explanation:
        "Bare godkjent hjelm er lovpålagt. Jakke, bukse, hansker og støvler er sterkt anbefalt, men ikke påbudt.",
      rule: "Forskrift om verneutstyr (FOR-1979-09-21-7) § 2",
      highlight: [],
    },
    {
      id: "mcv-passasjer-hjelm",
      type: "yesno",
      prompt: "Må passasjeren også bruke hjelm?",
      correct: true,
      explanation: "Både fører og passasjer skal bruke godkjent hjelm på motorsykkel.",
      rule: "Forskrift om verneutstyr § 2",
      highlight: [],
    },
    {
      id: "mcv-ansvar",
      type: "choice",
      prompt: "Passasjeren er 12 år. Hvem har ansvaret for at hun bruker hjelm?",
      options: [
        { id: "forer", text: "Føreren" },
        { id: "passasjer", text: "Passasjeren selv" },
        { id: "foresatte", text: "Bare foreldrene" },
        { id: "ingen", text: "Ingen – hjelm er frivillig for barn" },
      ],
      correct: "forer",
      explanation: "Føreren skal sørge for at passasjerer under 15 år bruker hjelm.",
      rule: "Forskrift om verneutstyr § 3",
      highlight: [],
    },
    {
      id: "mcv-antall",
      type: "yesno",
      prompt: "MC-en er registrert for to personer. Kan du ta med to passasjerer?",
      correct: false,
      explanation:
        "Du kan ikke ha med flere personer enn kjøretøyet er registrert for, og alle skal sitte på registrerte plasser. Her er det én passasjer i tillegg til deg.",
      rule: "Bruksforskriften § 3-1",
      highlight: [],
    },
    {
      id: "mcv-unntak",
      type: "yesno",
      prompt: "Må du bruke hjelm når du triller MC-en sakte rundt på en avgrenset parkeringsplass?",
      correct: false,
      explanation:
        "Hjelmplikten har unntak, blant annet for kjøring på parkeringsplass, i garasje og lignende avgrensede områder. På vegen gjelder plikten alltid.",
      rule: "Forskrift om verneutstyr § 2 bokstav b",
      highlight: [],
    },
  ],
};
