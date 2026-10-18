import { CYCLE_GAP, CYCLE_WIDTH, HW } from "../scene/road";
import { drive, junctionRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 26;
/** Midt i gang- og sykkelvegen på høyre side. */
const GS = HW + 0.3 + CYCLE_GAP + CYCLE_WIDTH / 2;

/** Høyresving over en gang- og sykkelveg der en syklist kommer. */
export const gangOgSykkelveg: Scenario = {
  id: "gang-og-sykkelveg",
  title: "Syklist på gang- og sykkelveg",
  topic: "sykkel",
  difficulty: 2,
  road: { type: "t-kryss", at: AT, branch: "right" },
  roadExtras: [{ type: "sykkelveg", side: "right" }],
  signs: [{ id: "gs-skilt", code: "522", pos: [GS + CYCLE_WIDTH / 2 + 0.8, 8], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "syklist",
      type: "sykkel",
      name: "Syklisten",
      pos: [GS, 15],
      heading: "N",
      color: "#c3f584",
      route: drive([GS, 15], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "hus", pos: [22, 12] },
    { type: "tre", pos: [-10, 12] },
    { type: "tre", pos: [18, 42] },
  ],
  player: { indicator: "right", route: junctionRoute({ from: "S", turn: "right", at: AT, start: AT }) },
  questions: [
    {
      id: "gs-vikeplikt",
      type: "choice",
      prompt: "Du skal svinge til høyre. Syklisten på gang- og sykkelvegen skal krysse sidevegen. Hvem har vikeplikt?",
      options: [
        { id: "syklist", text: "Syklisten – den som kommer fra gang- og sykkelveg, har vikeplikt" },
        { id: "du", text: "Du – syklister har alltid forkjørsrett" },
        { id: "forst", text: "Den som kommer først til krysset" },
        { id: "hoyre", text: "Høyreregelen avgjør" },
      ],
      correct: "syklist",
      explanation:
        "Den som vil inn på eller krysse vegen fra sykkelveg eller gang- og sykkelveg, har vikeplikt. Vær likevel aktpågivende – ikke alle syklister kjenner regelen.",
      rule: "Trafikkreglene § 7 nr. 4, vegtrafikkloven § 3",
      highlight: ["syklist"],
    },
    {
      id: "gs-kjore",
      type: "yesno",
      prompt: "Kan du kjøre motorvogn på gang- og sykkelvegen for å komme raskere forbi?",
      correct: false,
      explanation: "Gang- og sykkelveg er for gående og syklende. Det er ikke lov å kjøre motorvogn der.",
      rule: "Trafikkreglene § 4 nr. 1, skiltforskriften § 12 (skilt 522)",
      highlight: ["gs-skilt"],
    },
    {
      id: "gs-stanse",
      type: "yesno",
      prompt: "Kan du stanse eller parkere på gang- og sykkelvegen et øyeblikk?",
      correct: false,
      explanation: "Det er forbudt å stanse på fortau, gangveg og sykkelveg – også et kort øyeblikk.",
      rule: "Trafikkreglene § 17 nr. 1 c",
      highlight: ["gs-skilt"],
    },
  ],
};
