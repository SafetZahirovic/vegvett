import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 16;

/** Ut fra parkeringsplass: vikeplikt for all trafikk på vegen. */
export const utkjorselParkering: Scenario = {
  id: "utkjorsel-parkering",
  title: "Ut fra parkeringsplass",
  topic: "vikeplikt",
  difficulty: 1,
  road: { type: "t-ende", at: AT },
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "fra-venstre",
      type: "personbil",
      name: "Bilen fra venstre",
      ...junctionStart("W", AT, 18),
      color: "#ff8a65",
      route: junctionRoute({ from: "W", turn: "straight", at: AT, start: 18 }),
    },
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Bilen fra høyre",
      ...junctionStart("E", AT, 24),
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 24 }),
    },
  ],
  decor: [
    { type: "hus", pos: [-14, 2], size: 1.2 },
    { type: "hus", pos: [15, 4] },
    { type: "tre", pos: [-10, 34] },
    { type: "tre", pos: [12, 36] },
  ],
  player: { indicator: "right", route: junctionRoute({ from: "S", turn: "right", at: AT, start: AT }) },
  questions: [
    {
      id: "up-vikeplikt",
      type: "choice",
      prompt: "Du kjører ut fra en parkeringsplass og inn på vegen. Hvem har vikeplikt?",
      options: [
        { id: "du", text: "Du har vikeplikt for all trafikk på vegen" },
        { id: "hoyre", text: "Høyreregelen gjelder" },
        { id: "venstre", text: "Bilen fra venstre har vikeplikt for deg" },
        { id: "forst", text: "Den som kommer først" },
      ],
      correct: "du",
      explanation:
        "Den som kommer fra parkeringsplass, holdeplass, torg eller eiendom, har vikeplikt for andre trafikanter.",
      rule: "Trafikkreglene § 7 nr. 4",
      highlight: ["fra-venstre", "fra-hoyre"],
    },
    {
      id: "up-hoyreregel",
      type: "yesno",
      prompt: "Har bilen som kommer fra venstre vikeplikt for deg etter høyreregelen?",
      correct: false,
      explanation:
        "Høyreregelen gjelder ikke når du kommer fra en parkeringsplass. Da har du vikeplikt for all trafikk, også fra venstre.",
      rule: "Trafikkreglene § 7 nr. 4",
      highlight: ["fra-venstre"],
    },
    {
      id: "up-hvem-forst",
      type: "click",
      prompt: "Du skal svinge til høyre. Klikk på bilen som kjører i feltet du skal inn i.",
      correct: "fra-venstre",
      explanation:
        "Etter høyresvingen ligger du i feltet til bilen som kommer fra venstre. Den kjører først – vent til den har passert. Du har vikeplikt for bilen fra høyre også.",
      rule: "Trafikkreglene § 7 nr. 4",
      highlight: ["fra-venstre"],
    },
  ],
};
