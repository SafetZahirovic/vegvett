import { HW } from "../scene/road";
import { curveRoute, laneMarkers } from "./routes";
import type { Scenario } from "./types";

const AT = 24;
const R = 18;

/** MC: linjevalg og blikk i høyresving. */
export const mcHoyresving: Scenario = {
  id: "mc-hoyresving",
  title: "MC: høyresving",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "kurve", at: AT, side: "right", radius: R },
  signs: [{ id: "sving", code: "100.1", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [],
  markers: laneMarkers(AT - 4, ["Venstre del av feltet", "Midt i feltet", "Høyre del av feltet"]),
  decor: [
    { type: "tre", pos: [-9, 10] },
    { type: "tre", pos: [-10, 30], size: 1.2 },
    { type: "tre", pos: [12, 16] },
  ],
  view: { focus: [4, 20] },
  player: { route: curveRoute(AT, "right", R) },
  questions: [
    {
      id: "mch-start",
      type: "click",
      prompt: "Du skal gjennom en høyresving. Hvor i feltet bør du ligge når du går inn i svingen? Klikk.",
      correct: "felt-0",
      explanation:
        "I høyresving starter du i venstre del av feltet, så du ser lengre inn i svingen. Omtrent midt i svingen ligger du til høyre for midten. Hold deg i eget felt.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning)",
      highlight: ["felt-0"],
    },
    {
      id: "mch-blikk",
      type: "choice",
      prompt: "Hvor skal du se når du kjører gjennom svingen?",
      options: [
        { id: "dit", text: "Dit du vil kjøre" },
        { id: "forhjul", text: "Ned på forhjulet" },
        { id: "kant", text: "På kantlinjen rett ved deg" },
        { id: "speil", text: "I speilet" },
      ],
      correct: "dit",
      explanation: "Se dit du vil kjøre. Da styrer du mer presist.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning)",
      highlight: [],
    },
    {
      id: "mch-fart",
      type: "choice",
      prompt: "Når skal du senke farten?",
      options: [
        { id: "for", text: "Før svingen" },
        { id: "i", text: "Midt i svingen" },
        { id: "etter", text: "Etter svingen" },
        { id: "aldri", text: "Det trengs ikke på MC" },
      ],
      correct: "for",
      explanation: "Tilpass farten før svingen, ikke i den. Bremsing i svingen kan gjøre motorsykkelen ustabil.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning); vegtrafikkloven § 6",
      highlight: ["sving"],
    },
  ],
};
