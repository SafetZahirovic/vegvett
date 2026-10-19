import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const FELT = HW + LANE / 2;

/** Sambruksfelt (skilt 509): hvem kan kjøre der. */
export const sambruksfelt: Scenario = {
  id: "sambruksfelt",
  title: "Sambruksfelt",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  roadExtras: [{ type: "sambruksfelt", from: 6, to: 120, persons: 2 }],
  signs: [{ id: "sambruk-skilt", code: "509", pos: [HW + LANE + 1.6, 4], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "buss",
      type: "buss",
      name: "Bussen i sambruksfeltet",
      pos: [FELT, 34],
      heading: "N",
      color: "#ff8a65",
      route: drive([FELT, 34], "N", [["fwd", 30]]),
    },
    {
      id: "ko",
      type: "personbil",
      name: "Bilen foran deg",
      pos: [LANE / 2, 14],
      heading: "N",
      color: "#b8c4d6",
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 14] },
    { type: "tre", pos: [16, 30] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "sb-skilt",
      type: "choice",
      prompt: "Hva betyr skiltet ved feltet til høyre?",
      hidesSign: "sambruk-skilt",
      options: [
        { id: "sambruk", text: "Sambruksfelt" },
        { id: "kollektiv", text: "Kollektivfelt" },
        { id: "forbikjoring", text: "Forbikjøringsfelt" },
        { id: "motorveg", text: "Motorveg" },
      ],
      correct: "sambruk",
      explanation:
        "Skilt 509 Sambruksfelt viser et felt for buss, drosje og biler med minst så mange personer som skiltet angir.",
      rule: "Skiltforskriften § 8 (skilt 509)",
      highlight: ["sambruk-skilt"],
    },
    {
      id: "sb-alene",
      type: "yesno",
      prompt: "Du kjører bensinbil alene. Kan du bruke sambruksfeltet merket «2+»?",
      correct: false,
      explanation: "I sambruksfelt merket 2+ må det være minst to personer i bilen, føreren medregnet.",
      rule: "Skiltforskriften § 8 (skilt 509)",
      highlight: ["sambruk-skilt"],
    },
    {
      id: "sb-passasjer",
      type: "yesno",
      prompt: "Du har med én passasjer. Kan du bruke sambruksfeltet merket «2+»?",
      correct: true,
      explanation: "Med føreren og én passasjer er dere to personer, og det er nok når feltet er merket 2+.",
      rule: "Skiltforskriften § 8 (skilt 509)",
      highlight: ["sambruk-skilt"],
    },
    {
      id: "sb-slutt",
      type: "choice",
      prompt: "Hvor langt gjelder sambruksfeltet?",
      options: [
        { id: "slutt", text: "Til skilt 511 Slutt på sambruksfelt eller til første kryss" },
        { id: "km", text: "Alltid én kilometer" },
        { id: "bomring", text: "Til neste bomstasjon" },
        { id: "tid", text: "Bare i rushtiden" },
      ],
      correct: "slutt",
      explanation: "Sambruksfeltet gjelder til skilt 511 Slutt på sambruksfelt eller til første vegkryss.",
      rule: "Skiltforskriften § 8 (skilt 509)",
      highlight: ["sambruk-skilt"],
    },
    {
      id: "sb-stans",
      type: "yesno",
      prompt: "Kan du stanse i sambruksfeltet for å slippe av en passasjer?",
      correct: false,
      explanation: "Det er forbudt å stanse i sykkelfelt, kollektivfelt og sambruksfelt.",
      rule: "Trafikkreglene § 17 nr. 1 g",
      highlight: ["sambruk-skilt"],
    },
  ],
};
