import { LANE } from "../scene/road";
import { drive } from "./routes";
import { CENTER_LINE_ID, type Scenario } from "./types";

/** Dobbel sperrelinje: ikke lov å kjøre på eller over linjen, altså ingen forbikjøring her. */
export const sperrelinje: Scenario = {
  id: "sperrelinje",
  title: "Sperrelinje",
  topic: "forbikjoring",
  difficulty: 1,
  road: { type: "rett" },
  centerLine: [{ type: "midtlinje", to: 4 }, { type: "sperrelinje", from: 4 }],
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "treg",
      type: "personbil",
      name: "Den trege bilen",
      pos: [LANE / 2, 14],
      heading: "N",
      color: "#b8c4d6",
      route: drive([LANE / 2, 14], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-9, 8] },
    { type: "tre", pos: [-11, 22], size: 1.3 },
    { type: "tre", pos: [10, 30] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 9]]) },
  questions: [
    {
      id: "sperre-navn",
      type: "choice",
      prompt: "Hva kalles den doble, heltrukne gule linjen midt i vegen?",
      options: [
        { id: "sperre", text: "Sperrelinje" },
        { id: "varsel", text: "Varsellinje" },
        { id: "kant", text: "Kantlinje" },
        { id: "vike", text: "Vikelinje" },
      ],
      correct: "sperre",
      explanation: "Heltrukken gul linje mellom kjøreretningene er sperrelinje. Her er den dobbel.",
      rule: "Skiltforskriften § 22 (oppmerking 1004 / 1006)",
      highlight: [CENTER_LINE_ID],
    },
    {
      id: "sperre-forbi",
      type: "yesno",
      prompt: "Kan du kjøre forbi den trege bilen her?",
      correct: false,
      explanation:
        "For å kjøre forbi må du over i motsatt felt. Det er ikke lov å kjøre på eller over sperrelinjen.",
      rule: "Skiltforskriften § 22 (sperrelinje 1004), trafikkreglene § 12",
      highlight: [CENTER_LINE_ID, "treg"],
    },
  ],
};
