import { junctionRoute, junctionStart } from "./routes";
import { PLAYER_ID, type Scenario } from "./types";

const AT = 22;

/** Uregulert T-kryss: høyreregelen gjelder, også overfor deg som kommer fra den «mindre» vegen. */
export const tEndeHoyreregel: Scenario = {
  id: "t-ende-hoyreregel",
  title: "Uregulert T-kryss",
  topic: "vikeplikt",
  difficulty: 3,
  road: { type: "t-ende", at: AT },
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Bilen fra høyre",
      ...junctionStart("E", AT, 14),
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 14 }),
    },
    {
      id: "fra-venstre",
      type: "personbil",
      name: "Bilen fra venstre",
      ...junctionStart("W", AT, 15),
      color: "#ff8a65",
      route: junctionRoute({ from: "W", turn: "straight", at: AT, start: 15 }),
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 8] },
    { type: "tre", pos: [12, 8] },
    { type: "tre", pos: [-8, 38] },
    { type: "hus", pos: [14, 40] },
  ],
  player: { indicator: "left", route: junctionRoute({ from: "S", turn: "left", at: AT, start: AT }) },
  questions: [
    {
      id: "te-forst",
      type: "click",
      prompt: "T-krysset har ingen skilt. Klikk på kjøretøyet som skal kjøre først.",
      correct: "fra-hoyre",
      explanation:
        "Høyreregelen gjelder også i T-kryss. Du har bilen fra høyre på din høyre side og må vike for den. Den har ingen på sin høyre side.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["fra-hoyre"],
    },
    {
      id: "te-rekkefolge",
      type: "order",
      prompt: "Sett kjøretøyene i riktig rekkefølge gjennom krysset.",
      correct: ["fra-hoyre", PLAYER_ID, "fra-venstre"],
      explanation:
        "Bilen fra høyre kjører først. Så kjører du, fordi bilen fra venstre har deg på sin høyre side og må vike for deg.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["fra-hoyre", PLAYER_ID, "fra-venstre"],
    },
    {
      id: "te-gjennomgaende",
      type: "yesno",
      prompt: "Har trafikken på den gjennomgående vegen alltid forkjørsrett i et T-kryss?",
      correct: false,
      explanation:
        "Nei. Uten skilt gjelder høyreregelen også i T-kryss. Bilen fra venstre på den gjennomgående vegen må vike for deg.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["fra-venstre"],
    },
  ],
};
