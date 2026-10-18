import { HW } from "../scene/road";
import { curveRoute, laneMarkers } from "./routes";
import type { Scenario } from "./types";

const AT = 24;
const R = 22;

/** MC: linjevalg i venstresving. */
export const mcVenstresving: Scenario = {
  id: "mc-venstresving",
  title: "MC: venstresving",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "kurve", at: AT, side: "left", radius: R },
  signs: [{ id: "sving", code: "100.2", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [],
  markers: laneMarkers(AT - 4, ["Inntil midtlinjen", "Midt i feltet", "Inntil kantlinjen"], [0.5, 1.625, 2.75]),
  decor: [
    { type: "tre", pos: [11, 10] },
    { type: "tre", pos: [13, 30], size: 1.2 },
    { type: "tre", pos: [-10, 14] },
  ],
  view: { focus: [-4, 20] },
  player: { route: curveRoute(AT, "left", R) },
  questions: [
    {
      id: "mcv-start",
      type: "click",
      prompt: "Du skal gjennom en venstresving. Hvor i feltet bør du ligge når du går inn i svingen? Klikk.",
      correct: "felt-2",
      explanation:
        "I venstresving starter du inntil kantlinjen og fortsetter mot et punkt til venstre for midten. Slik ser du lengre og holder avstand til møtende.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning)",
      highlight: ["felt-2"],
    },
    {
      id: "mcv-midtlinje",
      type: "yesno",
      prompt: "Er det lurt å legge seg inntil midtlinjen i en venstresving?",
      correct: false,
      explanation:
        "Nei. Inntil midtlinjen kan hode og skuldre komme inn i motsatt felt når du lener, og du er nær møtende trafikk.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning); trafikkreglene § 5 nr. 1",
      highlight: ["felt-0"],
    },
  ],
};
