import { HW, LANE } from "../scene/road";
import { drive, laneMarkers } from "./routes";
import type { Scenario } from "./types";

/** MC: plassering i kjørefeltet på rett veg. */
export const mcPlassering: Scenario = {
  id: "mc-plassering",
  title: "MC: plassering i feltet",
  topic: "motorsykkel",
  difficulty: 1,
  licences: ["A"],
  road: { type: "rett" },
  signs: [{ id: "fart", code: "362", value: 80, pos: [HW + 1.5, 14], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-LANE / 2, 36],
      heading: "S",
      color: "#ff8a65",
      route: drive([-LANE / 2, 36], "S", [["fwd", 60]]),
    },
  ],
  markers: laneMarkers(
    9,
    ["Inntil midtlinjen", "Litt til venstre for midten av feltet", "Helt til høyre i feltet"],
    [0.45, 1.25, 2.85],
  ),
  decor: [
    { type: "tre", pos: [-9, 10] },
    { type: "tre", pos: [11, 24] },
    { type: "tre", pos: [-12, 34], size: 1.2 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mcp-hvor",
      type: "click",
      prompt: "Hvor i feltet anbefaler Statens vegvesen at du normalt ligger på rett veg? Klikk på plasseringen.",
      correct: "felt-1",
      explanation:
        "Normalplasseringen er litt til venstre for midten av eget felt. Den velges ut fra sikt, synbarhet, veggrep og trafikk.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning)",
      highlight: ["felt-1"],
    },
    {
      id: "mcp-lov",
      type: "yesno",
      prompt: "Finnes det en egen lovregel for nøyaktig hvor i feltet en motorsykkel skal ligge?",
      correct: false,
      explanation:
        "Nei. Trafikkreglene sier bare at du skal holde til høyre så langt forholdene tillater og holde deg godt innenfor kjørefeltet.",
      rule: "Trafikkreglene § 5 nr. 1",
      highlight: [],
    },
    {
      id: "mcp-hvorfor",
      type: "choice",
      prompt: "Hvorfor ligger du litt til venstre for midten av feltet?",
      options: [
        { id: "sikt", text: "For god sikt framover og for å bli lettere sett" },
        { id: "forbi", text: "For å være klar til å kjøre forbi hele tiden" },
        { id: "lov", text: "Fordi loven krever det" },
        { id: "fart", text: "For å kunne holde høyere fart" },
      ],
      correct: "sikt",
      explanation: "Plasseringen gir god sikt framover, gjør deg synlig for andre og holder deg unna kantens grus og hull.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning)",
      highlight: [],
    },
  ],
};
