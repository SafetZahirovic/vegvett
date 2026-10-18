import { HW, LANE } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import { PLAYER_ID, type Scenario } from "./types";

const AT = 32;

/** Forkjørskryss: begge sidevegene har vikeplikt. */
export const forkjorskryss: Scenario = {
  id: "forkjorskryss",
  title: "Forkjørskryss",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [
    { id: "forkjorskryss", code: "210", pos: [HW + 1.5, 12], facing: "S" },
    { id: "vikeplikt-ost", code: "202", pos: [HW + 3, AT + HW + 1.5], facing: "E" },
    { id: "vikeplikt-vest", code: "202", pos: [-HW - 3, AT - HW - 1.5], facing: "W" },
  ],
  markings: [
    { id: "vikelinje-ost", type: "vikelinje", a: [HW + 0.5, AT + 0.15], b: [HW + 0.5, AT + LANE], toward: "E" },
    { id: "vikelinje-vest", type: "vikelinje", a: [-HW - 0.5, AT - LANE], b: [-HW - 0.5, AT - 0.15], toward: "W" },
  ],
  vehicles: [
    {
      id: "fra-hoyre",
      type: "personbil",
      name: "Bilen fra høyre",
      ...junctionStart("E", AT, HW + 4.8),
      color: "#ffd166",
      route: junctionRoute({ from: "E", turn: "straight", at: AT, start: HW + 4.8 }),
    },
    {
      id: "fra-venstre",
      type: "personbil",
      name: "Bilen fra venstre",
      ...junctionStart("W", AT, HW + 4.8),
      color: "#ff8a65",
      route: junctionRoute({ from: "W", turn: "straight", at: AT, start: HW + 4.8 }),
    },
  ],
  decor: [
    { type: "tre", pos: [-12, 12] },
    { type: "hus", pos: [16, 16] },
    { type: "tre", pos: [14, 48] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "fk-skilt",
      type: "choice",
      prompt: "Hva varsler den røde trekanten med et tykt og et tynt strek?",
      hidesSign: "forkjorskryss",
      options: [
        { id: "farlig", text: "Farlig vegkryss – høyreregelen gjelder" },
        { id: "forkjor", text: "Forkjørskryss – sidevegene har vikeplikt" },
        { id: "vikeplikt", text: "Du har vikeplikt i krysset" },
        { id: "annen", text: "Annen fare" },
      ],
      correct: "forkjor",
      explanation: "Skilt 210 Forkjørskryss varsler at trafikk fra sidevegene har vikeplikt for deg.",
      rule: "Skiltforskriften § 6 (skilt 210)",
      highlight: ["forkjorskryss"],
    },
    {
      id: "fk-hvem-forst",
      type: "click",
      prompt: "Klikk på kjøretøyet som skal kjøre først gjennom krysset.",
      correct: PLAYER_ID,
      explanation:
        "Begge sidevegene har skilt 202 og vikelinje. Bilene der må vike for deg, så du kjører først – men følg med på at de faktisk venter.",
      rule: "Skiltforskriften § 6 (skilt 202 og 210)",
      highlight: [PLAYER_ID, "vikeplikt-ost", "vikeplikt-vest"],
    },
  ],
};
