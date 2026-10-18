import { junctionRoute, junctionStart } from "./routes";
import { PLAYER_ID, type Scenario } from "./types";

const AT = 24;
const fraHoyre = junctionStart("E", AT, 12);
const fraVenstre = junctionStart("W", AT, 13);

/**
 * Uregulert X-kryss: ingen skilt eller oppmerking, så høyreregelen gjelder.
 * Alle kjører rett frem.
 */
export const hoyreregelen: Scenario = {
  id: "hoyreregelen-x-kryss",
  title: "Uregulert kryss",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Den gule bilen (fra høyre)",
      ...fraHoyre,
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 12 }),
    },
    {
      id: "fra-venstre",
      type: "personbil",
      name: "Den oransje bilen (fra venstre)",
      ...fraVenstre,
      color: "#ff8a65",
      route: junctionRoute({ from: "W", turn: "straight", at: AT, start: 13 }),
    },
  ],
  decor: [
    { type: "hus", pos: [14, 10] },
    { type: "tre", pos: [-10, 12] },
    { type: "tre", pos: [-12, 38], size: 1.2 },
    { type: "tre", pos: [12, 40] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "hvem-forst",
      type: "click",
      prompt: "Krysset har ingen skilt. Klikk på kjøretøyet som skal kjøre først.",
      correct: "fra-hoyre",
      explanation:
        "Uten skilt gjelder høyreregelen: du har vikeplikt for den som kommer fra høyre. Den gule bilen har ingen fra sin høyre side og kjører først.",
      rule: "Trafikkreglene § 7 nr. 2 (høyreregelen)",
      highlight: ["fra-hoyre"],
    },
    {
      id: "rekkefolge",
      type: "order",
      prompt: "Sett kjøretøyene i riktig rekkefølge gjennom krysset.",
      correct: ["fra-hoyre", PLAYER_ID, "fra-venstre"],
      explanation:
        "Den gule bilen fra høyre kjører først. Så kjører du, fordi den oransje bilen har deg på sin høyre side og må vike for deg.",
      rule: "Trafikkreglene § 7 nr. 2 (høyreregelen)",
      highlight: ["fra-hoyre", "fra-venstre", PLAYER_ID],
    },
    {
      id: "hr-syklist",
      type: "yesno",
      prompt: "Gjelder høyreregelen også overfor en syklist som kommer fra høyre på kjørebanen?",
      correct: true,
      explanation:
        "En syklist på kjørebanen er kjørende, og høyreregelen gjelder. Kommer syklisten fra sykkelveg, gang- og sykkelveg eller fortau, har syklisten vikeplikt.",
      rule: "Trafikkreglene § 7 nr. 2 og nr. 4",
      highlight: [],
    },
  ],
};
