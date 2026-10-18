import { HW, RB_OUTER } from "../scene/road";
import { junctionStart, ringPosition, roundaboutRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 28;
const ENTRY = AT - RB_OUTER - 0.8;
const kommer = ringPosition(AT, 235);
const kjorerBort = ringPosition(AT, 40);
const venter = junctionStart("E", AT, RB_OUTER + 4);

/** Til venstre i rundkjøring: likevel mot klokka, og vikeplikt ved innkjøring. */
export const rundkjoringVenstre: Scenario = {
  id: "rundkjoring-venstre",
  title: "Til venstre i rundkjøring",
  topic: "rundkjoring",
  difficulty: 2,
  road: { type: "rundkjoring", at: AT },
  view: { focus: [0, 20] },
  signs: [
    { id: "vikeplikt", code: "202", pos: [HW + 1.5, ENTRY - 1], facing: "S" },
    { id: "rundkjoring", code: "406", pos: [HW + 1.5, ENTRY - 5], facing: "S" },
  ],
  markings: [{ id: "vikelinje", type: "vikelinje", a: [0.2, ENTRY], b: [HW - 0.2, ENTRY], toward: "S" }],
  vehicles: [
    {
      id: "kommer",
      type: "personbil",
      name: "Bilen som kommer i ringen",
      ...kommer,
      color: "#ffd166",
      route: roundaboutRoute({ at: AT, ringAngle: 235, exit: "E" }),
    },
    {
      id: "bort",
      type: "personbil",
      name: "Bilen som kjører bort fra deg",
      ...kjorerBort,
      color: "#c3f584",
      indicator: "right",
      route: roundaboutRoute({ at: AT, ringAngle: 40, exit: "N" }),
    },
    {
      id: "venter",
      type: "personbil",
      name: "Bilen som venter i øst",
      ...venter,
      color: "#ff8a65",
      route: roundaboutRoute({ at: AT, from: "E", start: RB_OUTER + 4, exit: "S" }),
    },
  ],
  decor: [
    { type: "tre", pos: [-12, 8] },
    { type: "tre", pos: [20, 46] },
    { type: "hus", pos: [-24, 42] },
  ],
  player: { route: roundaboutRoute({ at: AT, from: "S", start: AT, exit: "W" }) },
  questions: [
    {
      id: "rkv-retning",
      type: "choice",
      prompt: "Du skal til venstre (tredje avkjøring). Hvordan kjører du?",
      options: [
        { id: "mot", text: "Mot klokka rundt midtøya, som alltid" },
        { id: "med", text: "Med klokka, fordi det er kortest" },
        { id: "valgfritt", text: "Det er valgfritt når rundkjøringen er tom" },
        { id: "over", text: "Over midtøya hvis den er lav" },
      ],
      correct: "mot",
      explanation:
        "Skilt 406 Påbudt rundkjøring gjelder uansett hvor du skal. Du kjører mot klokka med midtøya på venstre side, også når du skal til venstre.",
      rule: "Skiltforskriften § 10 (skilt 406)",
      highlight: ["rundkjoring"],
    },
    {
      id: "rkv-vike",
      type: "click",
      prompt: "Klikk på bilen du må vike for før du kjører inn.",
      correct: "kommer",
      explanation:
        "Den gule bilen kjører i rundkjøringen og kommer mot innkjøringen din. Den har du vikeplikt for. Bilen som kjører bort fra deg, er ikke i veien, og bilen i øst har selv vikeplikt.",
      rule: "Skiltforskriften § 6 (skilt 202) og § 22 (vikelinje 1022)",
      highlight: ["kommer", "vikelinje"],
    },
    {
      id: "rkv-blink-inn",
      type: "yesno",
      prompt: "Er du pålagt å blinke til venstre når du kjører inn for å ta tredje avkjøring?",
      correct: false,
      explanation:
        "Det er ikke påbudt å blinke til venstre inn i rundkjøringen, men Statens vegvesen beskriver det som nyttig. Du skal blinke til høyre før du kjører ut.",
      rule: "Trafikkreglene § 14 nr. 2 (veiledning fra Statens vegvesen)",
      highlight: [],
    },
  ],
};
