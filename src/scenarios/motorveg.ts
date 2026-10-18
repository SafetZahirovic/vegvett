import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Motorveg: regler for hvem som kan kjøre der og hva som er forbudt. Forenklet til ett felt hver veg. */
export const motorveg: Scenario = {
  id: "motorveg",
  title: "Motorveg",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  centerLine: [{ type: "midtdeler" }],
  signs: [{ id: "motorveg-skilt", code: "502", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Møtende bil på den andre siden av midtdeleren",
      pos: [-LANE / 2, 36],
      heading: "S",
      color: "#ff8a65",
      route: drive([-LANE / 2, 36], "S", [["fwd", 60]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-12, 14] },
    { type: "tre", pos: [13, 30] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mv-skilt",
      type: "choice",
      prompt: "Hva betyr det blå skiltet?",
      hidesSign: "motorveg-skilt",
      options: [
        { id: "motortrafikkveg", text: "Motortrafikkveg" },
        { id: "motorveg", text: "Motorveg" },
        { id: "tunnel", text: "Tunnel" },
        { id: "bru", text: "Bru" },
      ],
      correct: "motorveg",
      explanation: "Skilt 502 Motorveg viser at motorvegen begynner.",
      rule: "Skiltforskriften § 12 (skilt 502)",
      highlight: ["motorveg-skilt"],
    },
    {
      id: "mv-forbudt",
      type: "choice",
      prompt: "Hva er forbudt på motorveg?",
      options: [
        { id: "rygge", text: "Å rygge, vende og stanse" },
        { id: "fart", text: "Å kjøre i fartsgrensen" },
        { id: "venstre", text: "Å bruke venstre felt til forbikjøring" },
        { id: "lys", text: "Å kjøre med nærlys" },
      ],
      correct: "rygge",
      explanation: "På motorveg er rygging og vending forbudt, og det er ikke lov å stanse.",
      rule: "Trafikkreglene § 11 nr. 2 og § 17 nr. 1 e",
      highlight: ["motorveg-skilt"],
    },
    {
      id: "mv-moped",
      type: "yesno",
      prompt: "Kan du kjøre moped på motorveg?",
      correct: false,
      explanation:
        "Bare motorvogner som lovlig kan kjøre minst 40 km/t på flat veg, er tillatt. Moped er ikke tillatt.",
      rule: "Trafikkreglene § 4 nr. 2",
      highlight: ["motorveg-skilt"],
    },
    {
      id: "mv-kjoretoy",
      type: "choice",
      prompt: "Hvilke kjøretøy kan kjøre på motorveg?",
      options: [
        { id: "40", text: "Motorvogner som lovlig kan kjøre minst 40 km/t på flat veg" },
        { id: "alle", text: "Alle kjøretøy, også sykler" },
        { id: "bil", text: "Bare personbiler" },
        { id: "moped", text: "Alle motorvogner, også moped" },
      ],
      correct: "40",
      explanation: "Bare motorvogner som kan og lovlig kan kjøre minst 40 km/t på flat veg, er tillatt på motorveg.",
      rule: "Trafikkreglene § 4 nr. 2",
      highlight: ["motorveg-skilt"],
    },
  ],
};
