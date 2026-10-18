import { HW, LANE } from "../scene/road";
import type { Scenario } from "./types";

const half = LANE / 2;

/** Smalt vegparti der du har vikeplikt for møtende (skilt 212). */
export const moteplikt: Scenario = {
  id: "moteplikt",
  title: "Smal bru med møteplikt",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "rett" },
  roadExtras: [{ type: "smalt", from: 22, to: 40 }],
  signs: [
    { id: "moteplikt", code: "212", pos: [HW + 1.5, 15], facing: "S" },
    { id: "smalere", code: "106.1", pos: [HW + 1.5, 6], facing: "S" },
    { id: "motende-har-vikeplikt", code: "214", pos: [-HW - 1.5, 47], facing: "N" },
  ],
  markings: [],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-half, 44],
      heading: "S",
      color: "#ff8a65",
      route: {
        turn: "straight",
        points: [
          [-half, 44],
          [-half, 42],
          [0, 36],
          [0, 26],
          [-half, 20],
          [-half, 4],
        ],
      },
    },
  ],
  decor: [
    { type: "tre", pos: [-9, 10] },
    { type: "tre", pos: [10, 46] },
  ],
  player: {
    route: {
      turn: "straight",
      points: [
        [half, 0],
        [half, 18],
        [0, 24],
        [0, 38],
        [half, 44],
        [half, 60],
      ],
    },
  },
  questions: [
    {
      id: "mp-skilt",
      type: "choice",
      prompt: "Hva betyr det runde skiltet med to piler?",
      hidesSign: "moteplikt",
      options: [
        { id: "motende", text: "Møtende kjørende har vikeplikt" },
        { id: "vikeplikt", text: "Vikeplikt overfor møtende kjørende" },
        { id: "toveis", text: "Møtende trafikk" },
        { id: "envei", text: "Enveiskjøring" },
      ],
      correct: "vikeplikt",
      explanation:
        "Skilt 212: du må ikke kjøre inn på det smale vegpartiet hvis du dermed hindrer møtende. De møtende har det blå skiltet 214.",
      rule: "Skiltforskriften § 6 (skilt 212 og 214)",
      highlight: ["moteplikt", "motende-har-vikeplikt"],
    },
    {
      id: "mp-hvem",
      type: "click",
      prompt: "Klikk på kjøretøyet som skal kjøre først gjennom det smale partiet.",
      correct: "motende",
      explanation: "Du har skilt 212 og må vente til den møtende bilen har kjørt gjennom.",
      rule: "Skiltforskriften § 6 (skilt 212)",
      highlight: ["motende", "moteplikt"],
    },
  ],
};
