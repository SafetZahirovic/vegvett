import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import { CENTER_LINE_ID, type Scenario } from "./types";

/** Syklist foran deg og sperrelinje: vent til det er trygt og lovlig å kjøre forbi. */
export const syklistSperrelinje: Scenario = {
  id: "syklist-sperrelinje",
  title: "Syklist og sperrelinje",
  topic: "sykkel",
  difficulty: 2,
  road: { type: "rett" },
  centerLine: [{ type: "sperrelinje" }],
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "syklist",
      type: "sykkel",
      name: "Syklisten",
      pos: [HW - 0.9, 14],
      heading: "N",
      color: "#c3f584",
      route: drive([HW - 0.9, 14], "N", [["fwd", 30]]),
    },
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-LANE / 2, 40],
      heading: "S",
      color: "#ff8a65",
      route: drive([-LANE / 2, 40], "S", [["fwd", 60]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-9, 8] },
    { type: "tre", pos: [10, 24] },
    { type: "tre", pos: [-11, 34], size: 1.2 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 9]]) },
  questions: [
    {
      id: "ss-forbi",
      type: "yesno",
      prompt: "Kan du krysse sperrelinjen for å kjøre forbi syklisten?",
      correct: false,
      explanation:
        "Du skal ikke kjøre på eller over sperrelinje, heller ikke for å passere en syklist. Er det ikke plass til å passere med god avstand i eget felt, må du vente.",
      rule: "Skiltforskriften § 22 (sperrelinje 1004), trafikkreglene § 12",
      highlight: [CENTER_LINE_ID, "syklist"],
    },
    {
      id: "ss-avstand",
      type: "choice",
      prompt: "Hvor stor sideavstand anbefaler Statens vegvesen når du kjører forbi en syklist?",
      options: [
        { id: "0.5", text: "Minst 0,5 meter" },
        { id: "1", text: "Minst 1 meter" },
        { id: "1.5", text: "Minst 1,5 meter" },
        { id: "ingen", text: "Det finnes ingen anbefaling" },
      ],
      correct: "1.5",
      explanation:
        "Trafikkreglene krever god avstand ved forbikjøring. Statens vegvesen anbefaler minst 1,5 meter når du kjører forbi syklister.",
      rule: "Trafikkreglene § 12 (Statens vegvesens tolkning)",
      highlight: ["syklist"],
    },
    {
      id: "ss-svinge",
      type: "yesno",
      prompt: "Kan du krysse sperrelinjen for å svinge inn til en eiendom på venstre side?",
      correct: false,
      explanation: "Du skal ikke kjøre på eller over sperrelinjen. Kjør videre til et sted der du lovlig kan snu eller svinge.",
      rule: "Skiltforskriften § 22 (sperrelinje 1004)",
      highlight: [CENTER_LINE_ID],
    },
  ],
};
