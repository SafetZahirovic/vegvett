import { HW, LANE } from "../scene/road";
import { CENTER_LINE_ID, type Scenario } from "./types";
import { drive } from "./routes";

const half = LANE / 2;

/** MC i kø: ingen kjøring mellom køen og midtlinjen. */
export const mcKo: Scenario = {
  id: "mc-ko",
  title: "MC: i kø",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "rett" },
  signs: [{ id: "ko-skilt", code: "149", pos: [HW + 1.5, 5], facing: "S" }],
  markings: [],
  vehicles: [
    { id: "bil-1", type: "personbil", name: "Bilen foran deg", pos: [half, 9], heading: "N", color: "#b8c4d6" },
    { id: "bil-2", type: "personbil", name: "Bil i køen", pos: [half, 16], heading: "N", color: "#ffd166" },
    { id: "bil-3", type: "personbil", name: "Bil i køen", pos: [half, 23], heading: "N", color: "#b8c4d6" },
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-half, 36],
      heading: "S",
      color: "#ff8a65",
      route: drive([-half, 36], "S", [["fwd", 60]]),
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 14] },
    { type: "hus", pos: [15, 26] },
  ],
  player: { route: drive([half, 0], "N", [["fwd", 4]]) },
  questions: [
    {
      id: "mck-mellom",
      type: "yesno",
      prompt: "Kan du kjøre mellom bilkøen og midtlinjen for å komme raskere fram?",
      correct: false,
      explanation:
        "Kjøring mellom køer er ikke tillatt i Norge. Du skal holde deg godt innenfor ditt eget felt og bli i køen.",
      rule: "Trafikkreglene § 5 nr. 1 og § 12",
      highlight: [CENTER_LINE_ID, "bil-1"],
    },
    {
      id: "mck-hoyre",
      type: "choice",
      prompt: "På en veg med to felt i samme retning står det kø i begge feltene. Når er det lov å kjøre forbi på høyre side?",
      options: [
        { id: "tett", text: "Når trafikken er så tett at alle felt er fulle og farten bestemmes av kjøretøyet foran" },
        { id: "alltid", text: "Alltid, når du kjører MC" },
        { id: "aldri", text: "Aldri" },
        { id: "skulder", text: "Når du kjører på vegskulderen" },
      ],
      correct: "tett",
      explanation:
        "Forbikjøring til høyre er tillatt når trafikken er så tett at alle felt i samme retning er fylt opp og farten bestemmes av kjøretøyet foran. Det gjelder i et annet felt, ikke mellom køene.",
      rule: "Trafikkreglene § 12 nr. 1 c",
      highlight: [],
    },
    {
      id: "mck-avstand",
      type: "choice",
      prompt: "Hvor stor avstand skal du holde til bilen foran i køen?",
      options: [
        { id: "stanse", text: "Så stor at du ikke kjører på den om den bremser" },
        { id: "tett", text: "Så tett som mulig, så ingen tar plassen" },
        { id: "1m", text: "Én meter" },
        { id: "ingen", text: "Det finnes ingen regel" },
      ],
      correct: "stanse",
      explanation: "Avstanden til forankjørende skal være så stor at du unngår påkjøring hvis den foran bremser.",
      rule: "Trafikkreglene § 5 nr. 3",
      highlight: ["bil-1"],
    },
  ],
};
