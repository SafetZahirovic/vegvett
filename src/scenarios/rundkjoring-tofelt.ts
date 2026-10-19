import { HW, LANE, RB2_DRIVE_INNER, RB2_DRIVE_OUTER, RB2_OUTER } from "../scene/road";
import { laneMarkers, ringPosition, roundaboutRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 32;
const ENTRY = AT - RB2_OUTER - 0.8;
const RIGHT_LANE = HW + LANE / 2;
const ytre = ringPosition(AT, 200, RB2_DRIVE_OUTER);

/** Tofelts rundkjøring: feltvalg etter hvor du skal. */
export const rundkjoringTofelt: Scenario = {
  id: "rundkjoring-tofelt",
  title: "Feltvalg i tofelts rundkjøring",
  topic: "rundkjoring",
  difficulty: 3,
  road: { type: "rundkjoring", at: AT, lanes: 2 },
  roadExtras: [{ type: "ekstrafelt", from: -40, to: ENTRY + 1 }],
  view: { focus: [0, 22] },
  signs: [
    { id: "vikeplikt", code: "202", pos: [HW + LANE + 1.8, ENTRY - 1], facing: "S" },
    { id: "rundkjoring", code: "406", pos: [HW + LANE + 1.8, ENTRY - 5], facing: "S" },
  ],
  markings: [
    { id: "vikelinje", type: "vikelinje", a: [0.2, ENTRY], b: [HW + LANE - 0.2, ENTRY], toward: "S" },
  ],
  markers: laneMarkers(ENTRY - 12, ["Venstre felt", "Midt mellom feltene", "Høyre felt"], [
    LANE / 2,
    HW - 0.1,
    RIGHT_LANE,
  ]),
  vehicles: [
    {
      id: "ytre",
      type: "personbil",
      name: "Bilen i det ytre feltet",
      ...ytre,
      color: "#ffd166",
      route: roundaboutRoute({ at: AT, ringAngle: 200, exit: "S", driveRadius: RB2_DRIVE_OUTER, outer: RB2_OUTER }),
    },
    {
      id: "hoyre",
      type: "personbil",
      name: "Bilen i høyre felt ved siden av deg",
      pos: [RIGHT_LANE, 4],
      heading: "N",
      color: "#c3f584",
      indicator: "right",
    },
  ],
  decor: [
    { type: "tre", pos: [-12, 6] },
    { type: "hus", pos: [-28, 50] },
    { type: "tre", pos: [26, 56] },
  ],
  player: {
    indicator: "left",
    route: roundaboutRoute({
      at: AT,
      from: "S",
      start: AT,
      exit: "W",
      driveRadius: RB2_DRIVE_INNER,
      outer: RB2_OUTER,
    }),
  },
  questions: [
    {
      id: "rk2-felt-venstre",
      type: "click",
      prompt: "Du skal ta tredje avkjøring (til venstre). Klikk der du bør ligge før rundkjøringen.",
      correct: "felt-0",
      explanation:
        "I en tofelts rundkjøring velger du venstre felt når du skal til venstre eller lenger rundt. Da kjører du i det indre feltet og bytter ikke felt foran andre.",
      rule: "Trafikkreglene § 6 nr. 1 og § 5 nr. 1 (veiledning fra Statens vegvesen)",
      highlight: ["felt-0"],
    },
    {
      id: "rk2-felt-hoyre",
      type: "choice",
      prompt: "Hvilket felt velger du hvis du skal ta første avkjøring (til høyre)?",
      options: [
        { id: "hoyre", text: "Høyre felt" },
        { id: "venstre", text: "Venstre felt" },
        { id: "valgfritt", text: "Det spiller ingen rolle" },
        { id: "midt", text: "Begge, midt mellom feltene" },
      ],
      correct: "hoyre",
      explanation:
        "Skal du ut i første avkjøring, ligger du i høyre felt og blir i det ytre feltet hele vegen. Rett fram velger du som regel også høyre felt, med mindre piler i vegbanen viser noe annet.",
      rule: "Trafikkreglene § 6 nr. 1 (veiledning fra Statens vegvesen)",
      highlight: ["hoyre"],
    },
    {
      id: "rk2-ut",
      type: "click",
      prompt: "Du ligger i det indre feltet og skal ut. Klikk på bilen du må vike for.",
      correct: "ytre",
      explanation:
        "Når du skifter fra det indre til det ytre feltet for å kjøre ut, skal du vike for trafikk i feltet du skifter til.",
      rule: "Trafikkreglene § 8 nr. 1",
      highlight: ["ytre"],
    },
    {
      id: "rk2-piler",
      type: "yesno",
      prompt: "Viser piler i vegbanen hvilke retninger feltet er for, skal du følge dem?",
      correct: true,
      explanation: "Kjørefeltpiler viser hvilken retning du kan kjøre fra feltet. Velg felt etter pilene i god tid.",
      rule: "Skiltforskriften § 22 (oppmerking 1034)",
      highlight: [],
    },
  ],
};
