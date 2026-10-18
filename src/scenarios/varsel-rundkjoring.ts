import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Fareskilt som varsler rundkjøring foran. */
export const varselRundkjoring: Scenario = {
  id: "varsel-rundkjoring",
  title: "Rundkjøring foran",
  topic: "rundkjoring",
  difficulty: 1,
  road: { type: "rett" },
  signs: [
    { id: "rk-varsel", code: "126", pos: [HW + 1.5, 10], facing: "S" },
    { id: "fart", code: "362", value: 60, pos: [HW + 1.5, 20], facing: "S" },
  ],
  markings: [],
  vehicles: [
    {
      id: "foran",
      type: "personbil",
      name: "Bilen foran",
      pos: [LANE / 2, 28],
      heading: "N",
      color: "#ffd166",
      route: drive([LANE / 2, 28], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-10, 12] },
    { type: "hus", pos: [16, 30] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "vr-skilt",
      type: "choice",
      prompt: "Hva varsler den røde trekanten?",
      hidesSign: "rk-varsel",
      options: [
        { id: "rundkjoring", text: "Rundkjøring" },
        { id: "pabudt", text: "Påbudt rundkjøring" },
        { id: "omkjoring", text: "Omkjøring" },
        { id: "kryss", text: "Farlig vegkryss" },
      ],
      correct: "rundkjoring",
      explanation:
        "Skilt 126 Rundkjøring er et fareskilt som varsler rundkjøring foran. Det blå skiltet 406 står ved selve rundkjøringen.",
      rule: "Skiltforskriften § 4 (skilt 126)",
      highlight: ["rk-varsel"],
    },
    {
      id: "vr-handling",
      type: "choice",
      prompt: "Hva gjør du når du ser skiltet?",
      options: [
        { id: "forbered", text: "Senker farten og forbereder meg på å vike for trafikk i rundkjøringen" },
        { id: "forbi", text: "Kjører forbi bilen foran før rundkjøringen" },
        { id: "samme", text: "Holder farten, rundkjøringer har ingen vikeplikt" },
        { id: "venstre", text: "Legger meg i venstre side av vegen" },
      ],
      correct: "forbered",
      explanation:
        "Ved innkjøring til rundkjøringer står det normalt vikepliktskilt og vikelinje. Senk farten i god tid og vær klar til å vike.",
      rule: "Skiltforskriften § 4 (skilt 126), § 6 (skilt 202)",
      highlight: ["rk-varsel"],
    },
  ],
};
