import { HW, LANE } from "../scene/road";
import { drive, junctionRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 30;

export const tKryssForkjorsveg: Scenario = {
  id: "t-kryss-forkjorsveg",
  title: "T-kryss på forkjørsveg",
  topic: "vikeplikt",
  difficulty: 1,
  road: { type: "t-kryss", at: AT, branch: "right" },
  signs: [
    { id: "forkjorsveg", code: "206", pos: [HW + 1.5, 8], facing: "S" },
    // Gjelder trafikk ut fra sidevegen (kjører mot vest).
    { id: "vikeplikt", code: "202", pos: [HW + 3, AT + HW + 1.5], facing: "E" },
  ],
  markings: [
    { id: "vikelinje", type: "vikelinje", a: [HW + 0.5, AT + 0.15], b: [HW + 0.5, AT + LANE], toward: "E" },
  ],
  vehicles: [
    {
      id: "sidebil",
      type: "personbil",
      name: "Den gule bilen",
      pos: [HW + 4.8, AT + LANE / 2],
      heading: "W",
      color: "#ffd166",
      indicator: "left",
      route: junctionRoute({ from: "E", turn: "left", at: AT, start: HW + 4.8 }),
    },
  ],
  decor: [
    { type: "tre", pos: [-10, 10] },
    { type: "tre", pos: [-11, 22], size: 1.1 },
    { type: "hus", pos: [16, 44] },
    { type: "tre", pos: [12, 16] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 55]]) },
  questions: [
    {
      id: "hvem-viker",
      type: "choice",
      prompt: "Hvem har vikeplikt i dette krysset?",
      options: [
        { id: "deg", text: "Du (den blå bilen)" },
        { id: "gul", text: "Den gule bilen i sidevegen" },
        { id: "begge", text: "Begge må stanse før krysset" },
        { id: "ingen", text: "Ingen – høyreregelen avgjør" },
      ],
      correct: "gul",
      explanation:
        "Du kjører på forkjørsveg (skilt 206). Den gule bilen har skilt 202 Vikeplikt og vikelinje, og må vike for deg.",
      rule: "Skiltforskriften § 6 (skilt 202 og 206), trafikkreglene § 7 nr. 1",
      highlight: ["forkjorsveg", "vikeplikt", "vikelinje", "sidebil"],
    },
    {
      id: "skilt-sideveg",
      type: "choice",
      prompt: "Hva betyr skiltet som står ved sidevegen?",
      hidesSign: "vikeplikt",
      options: [
        { id: "farlig", text: "Farlig kryss" },
        { id: "forkjorsveg", text: "Forkjørsveg" },
        { id: "stopp", text: "Stopp" },
        { id: "vikeplikt", text: "Vikeplikt" },
      ],
      correct: "vikeplikt",
      explanation:
        "Skilt 202 Vikeplikt står ved vikelinjen. Den som kommer fra sidevegen, må vike for trafikken på vegen de skal inn på.",
      rule: "Skiltforskriften § 6 (skilt 202)",
      highlight: ["vikeplikt", "vikelinje"],
    },
    {
      id: "forkjorsveg-aktsom",
      type: "yesno",
      prompt: "Kan du kjøre gjennom krysset uten å følge med på den gule bilen, siden du har forkjørsrett?",
      correct: false,
      explanation:
        "Selv om andre har vikeplikt, skal du være aktpågivende og kunne stanse hvis noen ikke overholder vikeplikten.",
      rule: "Vegtrafikkloven § 3",
      highlight: ["sidebil"],
    },
  ],
};
