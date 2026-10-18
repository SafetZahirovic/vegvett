import { HW, LANE } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 24;
const LINE_V = AT - HW - 0.6;

/** T-kryss med vikeplikt: du skal til venstre og må vike for trafikk fra begge retninger. */
export const tEndeVikeplikt: Scenario = {
  id: "t-ende-vikeplikt",
  title: "Vikeplikt i T-kryss",
  topic: "vikeplikt",
  difficulty: 1,
  road: { type: "t-ende", at: AT },
  signs: [{ id: "vikeplikt", code: "202", pos: [HW + 1.5, LINE_V - 1.5], facing: "S" }],
  markings: [{ id: "vikelinje", type: "vikelinje", a: [0.15, LINE_V], b: [LANE - 0.1, LINE_V], toward: "S" }],
  vehicles: [
    {
      id: "fra-venstre",
      type: "personbil",
      name: "Bilen fra venstre",
      ...junctionStart("W", AT, 16),
      color: "#ff8a65",
      route: junctionRoute({ from: "W", turn: "straight", at: AT, start: 16 }),
    },
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Bilen fra høyre",
      ...junctionStart("E", AT, 22),
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 22 }),
    },
  ],
  decor: [
    { type: "tre", pos: [-12, 10] },
    { type: "tre", pos: [12, 14], size: 1.2 },
    { type: "hus", pos: [-16, 42] },
  ],
  player: { indicator: "left", route: junctionRoute({ from: "S", turn: "left", at: AT, start: AT }) },
  questions: [
    {
      id: "tv-venstre",
      type: "yesno",
      prompt: "Du har vikepliktskilt. Har du vikeplikt også for bilen som kommer fra venstre?",
      correct: true,
      explanation: "Skilt 202 gir deg vikeplikt for trafikk fra begge retninger på vegen du skal inn på.",
      rule: "Skiltforskriften § 6 (skilt 202)",
      highlight: ["vikeplikt", "fra-venstre", "fra-hoyre"],
    },
    {
      id: "tv-hvor",
      type: "choice",
      prompt: "Hvor skal du stanse hvis du må vente?",
      options: [
        { id: "vikelinje", text: "Ved vikelinjen" },
        { id: "midt", text: "Ute i krysset, så du kommer raskt av gårde" },
        { id: "skilt", text: "Ti meter før skiltet" },
        { id: "fortau", text: "Hvor som helst, bare du ser trafikken" },
      ],
      correct: "vikelinje",
      explanation: "Vikelinjen viser hvor du skal stanse hvis det er nødvendig for å overholde vikeplikten.",
      rule: "Skiltforskriften § 22 (vikelinje 1022)",
      highlight: ["vikelinje"],
    },
    {
      id: "tv-skilt",
      type: "choice",
      prompt: "Hva betyr den røde trekanten med spissen ned?",
      hidesSign: "vikeplikt",
      options: [
        { id: "vikeplikt", text: "Vikeplikt" },
        { id: "stopp", text: "Stopp" },
        { id: "fare", text: "Annen fare" },
        { id: "forkjor", text: "Forkjørsveg" },
      ],
      correct: "vikeplikt",
      explanation: "Skilt 202 Vikeplikt: du har vikeplikt for trafikk på vegen du skal inn på eller krysse.",
      rule: "Skiltforskriften § 6 (skilt 202)",
      highlight: ["vikeplikt"],
    },
  ],
};
