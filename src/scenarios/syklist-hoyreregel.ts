import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 24;

/** Uregulert kryss med syklist fra høyre på kjørebanen. */
export const syklistHoyreregel: Scenario = {
  id: "syklist-hoyreregel",
  title: "Syklist fra høyre",
  topic: "sykkel",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "syklist",
      type: "sykkel",
      name: "Syklisten fra høyre",
      ...junctionStart("E", AT, 9),
      color: "#c3f584",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: 9 }),
    },
  ],
  decor: [
    { type: "hus", pos: [15, 12] },
    { type: "tre", pos: [-11, 12] },
    { type: "hus", pos: [-15, 40] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "sh-forst",
      type: "click",
      prompt: "Krysset er uregulert. Klikk på den som skal kjøre først.",
      correct: "syklist",
      explanation: "Syklisten er kjørende på kjørebanen og kommer fra høyre. Høyreregelen gjelder: du må vike.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["syklist"],
    },
    {
      id: "sh-gs-veg",
      type: "yesno",
      prompt: "Ville svaret vært annerledes hvis syklisten kom ut fra en gang- og sykkelveg?",
      correct: true,
      explanation:
        "Ja. Den som kommer fra sykkelveg, gang- og sykkelveg eller fortau og vil inn på eller krysse vegen, har vikeplikt.",
      rule: "Trafikkreglene § 7 nr. 4",
      highlight: ["syklist"],
    },
  ],
};
