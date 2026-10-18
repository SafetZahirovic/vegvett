import { HW, RB_OUTER } from "../scene/road";
import { ringPosition, roundaboutRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 28;
const ENTRY = AT - RB_OUTER - 0.8;
const iRingen = ringPosition(AT, 205);

/** Inn i rundkjøring: vikeplikt for trafikk som allerede er i ringen. */
export const rundkjoringInn: Scenario = {
  id: "rundkjoring-inn",
  title: "Inn i rundkjøring",
  topic: "rundkjoring",
  difficulty: 1,
  road: { type: "rundkjoring", at: AT },
  view: { focus: [0, 20] },
  signs: [
    { id: "vikeplikt", code: "202", pos: [HW + 1.5, ENTRY - 1], facing: "S" },
    { id: "rundkjoring", code: "406", pos: [HW + 1.5, ENTRY - 5], facing: "S" },
  ],
  markings: [{ id: "vikelinje", type: "vikelinje", a: [0.2, ENTRY], b: [HW - 0.2, ENTRY], toward: "S" }],
  vehicles: [
    {
      id: "i-ringen",
      type: "personbil",
      name: "Bilen i rundkjøringen",
      ...iRingen,
      color: "#ffd166",
      indicator: "right",
      route: roundaboutRoute({ at: AT, ringAngle: 205, exit: "E" }),
    },
  ],
  decor: [
    { type: "tre", pos: [-12, 8] },
    { type: "hus", pos: [-24, 40] },
    { type: "tre", pos: [22, 12] },
  ],
  player: { route: roundaboutRoute({ at: AT, from: "S", start: AT, exit: "N" }) },
  questions: [
    {
      id: "rk-hvem-forst",
      type: "click",
      prompt: "Du skal inn i rundkjøringen. Klikk på kjøretøyet som skal kjøre først.",
      correct: "i-ringen",
      explanation:
        "Ved innkjøringen står skilt 202 Vikeplikt og vikelinje. Du må vike for trafikk som allerede kjører i rundkjøringen.",
      rule: "Skiltforskriften § 6 (skilt 202) og § 22 (vikelinje 1022)",
      highlight: ["i-ringen", "vikeplikt", "vikelinje"],
    },
    {
      id: "rk-retning",
      type: "yesno",
      prompt: "Skal du kjøre mot klokka rundt midtøya, slik pilene på det blå skiltet viser?",
      correct: true,
      explanation:
        "Skilt 406 Påbudt rundkjøring viser at du skal kjøre mot klokka, med midtøya på venstre side.",
      rule: "Skiltforskriften § 10 (skilt 406)",
      highlight: ["rundkjoring"],
    },
  ],
};
