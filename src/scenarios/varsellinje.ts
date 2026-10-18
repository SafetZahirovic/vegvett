import { LANE } from "../scene/road";
import { drive } from "./routes";
import { CENTER_LINE_ID, type Scenario } from "./types";

/** Varsellinje før en sperrelinje: sikten er for kort til vanlig forbikjøring. */
export const varsellinje: Scenario = {
  id: "varsellinje",
  title: "Varsellinje",
  topic: "oppmerking",
  difficulty: 2,
  road: { type: "rett" },
  centerLine: [{ type: "varsellinje", to: 30 }, { type: "sperrelinje", from: 30 }],
  signs: [],
  markings: [],
  vehicles: [
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
    { type: "tre", pos: [-9, 10] },
    { type: "tre", pos: [10, 22] },
    { type: "tre", pos: [-12, 34], size: 1.2 },
    { type: "tre", pos: [12, 44] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "varsel-betydning",
      type: "choice",
      prompt: "Midtlinjen har lange streker og korte mellomrom. Hva forteller den?",
      options: [
        { id: "varsel", text: "Sikten er for kort til vanlig forbikjøring – vær ekstra forsiktig" },
        { id: "fritt", text: "Her er det ekstra trygt å kjøre forbi" },
        { id: "forbud", text: "Forbikjøring er forbudt" },
        { id: "kollektiv", text: "Kollektivfelt begynner" },
      ],
      correct: "varsel",
      explanation:
        "Dette er en varsellinje. Gul varsellinje betyr at sikten er for kort til vanlig forbikjøring. Her går den over i sperrelinje.",
      rule: "Skiltforskriften § 22 (varsellinje 1002)",
      highlight: [CENTER_LINE_ID],
    },
    {
      id: "varsel-krysse",
      type: "yesno",
      prompt: "Er det lov å krysse en varsellinje?",
      correct: true,
      explanation:
        "En varsellinje kan krysses, men den varsler fare. Du må selv vurdere om det er trygt, og forbikjøring krever fri sikt.",
      rule: "Skiltforskriften § 22 (varsellinje 1002), trafikkreglene § 12",
      highlight: [CENTER_LINE_ID, "motende"],
    },
  ],
};
