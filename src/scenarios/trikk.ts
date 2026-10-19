import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const half = LANE / 2;

/** Trikk på holdeplass uten trafikkøy, og vikeplikt for trikk. */
export const trikk: Scenario = {
  id: "trikk",
  title: "Trikk ved holdeplass",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "rett" },
  roadExtras: [{ type: "trikkeskinner" }],
  signs: [{ id: "fart", code: "362", value: 40, pos: [HW + 1.5, 4], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "trikken",
      type: "trikk",
      name: "Trikken på holdeplassen",
      pos: [-0.2, 30],
      heading: "N",
      color: "#9be7ff",
      route: drive([-0.2, 30], "N", [["fwd", 30]]),
    },
  ],
  pedestrians: [
    { id: "passasjer", name: "Passasjeren som går til trikken", pos: [HW + 1, 30], heading: "W" },
  ],
  decor: [
    { type: "hus", pos: [15, 18] },
    { type: "hus", pos: [-15, 26] },
    { type: "hus", pos: [15, 42] },
  ],
  player: { route: drive([half, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "tr-holdeplass",
      type: "choice",
      prompt: "Trikken står på holdeplass uten trafikkøy, og passasjerer går over vegen til den. Hva gjør du?",
      options: [
        { id: "stans", text: "Stanser og slipper passasjerene fram" },
        { id: "forbi", text: "Kjører forsiktig forbi på høyre side uten å stanse" },
        { id: "tut", text: "Tuter så de ser deg" },
        { id: "venstre", text: "Kjører forbi på venstre side av trikken" },
      ],
      correct: "stans",
      explanation:
        "Kjører du forbi til høyre for en trikk på holdeplass uten trafikkøy, skal du stanse og slippe av- og påstigende passasjerer fram.",
      rule: "Trafikkreglene § 9 nr. 3",
      highlight: ["trikken", "passasjer"],
    },
    {
      id: "tr-fri-veg",
      type: "yesno",
      prompt: "Skal du gi fri veg for trikken og stanse om nødvendig?",
      correct: true,
      explanation: "Du skal gi fri veg for sporvogn og tog, og stanse om nødvendig.",
      rule: "Trafikkreglene § 10 nr. 2",
      highlight: ["trikken"],
    },
    {
      id: "tr-forbi",
      type: "choice",
      prompt: "På hvilken side kan du kjøre forbi en trikk som kjører i samme retning?",
      options: [
        { id: "hoyre", text: "På høyre side" },
        { id: "venstre", text: "Bare på venstre side" },
        { id: "aldri", text: "Det er aldri lov å kjøre forbi en trikk" },
        { id: "begge", text: "På den siden som er raskest" },
      ],
      correct: "hoyre",
      explanation: "Forbikjøring av trikk kan skje til høyre. Pass på passasjerer ved holdeplasser.",
      rule: "Trafikkreglene § 12 nr. 1 b",
      highlight: ["trikken"],
    },
    {
      id: "tr-fart",
      type: "yesno",
      prompt: "Skal du ha særlig lav fart når du passerer en trikk eller buss som har stanset ved holdeplass?",
      correct: true,
      explanation: "Ved trikk eller buss som stanser ved holdeplass, skal farten være særlig lav.",
      rule: "Trafikkreglene § 13 nr. 2 e",
      highlight: ["trikken"],
    },
  ],
};
