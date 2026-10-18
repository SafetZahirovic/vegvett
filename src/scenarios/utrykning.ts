import { LANE } from "../scene/road";
import type { Scenario } from "./types";

const half = LANE / 2;

/** Utrykningskjøretøy med blålys bakfra: gi fri veg. */
export const utrykning: Scenario = {
  id: "utrykning",
  title: "Utrykning bakfra",
  topic: "utrykning",
  difficulty: 1,
  road: { type: "rett" },
  view: { focus: [0, 4] },
  signs: [],
  markings: [],
  vehicles: [
    {
      id: "ambulanse",
      type: "utrykning",
      name: "Ambulansen",
      pos: [half, -14],
      heading: "N",
      color: "#f2f6ff",
      siren: true,
      route: {
        turn: "straight",
        points: [
          [half, -14],
          [half, -8],
          [-0.6, 0],
          [-0.6, 10],
          [half, 20],
          [half, 50],
        ],
      },
    },
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-half, 30],
      heading: "S",
      color: "#ffd166",
      route: {
        turn: "pullover",
        points: [
          [-half, 30],
          [-half, 24],
          [-2.7, 18],
          [-2.7, 14],
        ],
      },
    },
  ],
  decor: [
    { type: "tre", pos: [-10, 6] },
    { type: "tre", pos: [11, 18] },
    { type: "tre", pos: [-12, 30], size: 1.2 },
  ],
  player: {
    indicator: "right",
    route: {
      turn: "pullover",
      points: [
        [half, 0],
        [half, 4],
        [2.7, 10],
        [2.7, 14],
      ],
    },
  },
  questions: [
    {
      id: "utr-hva",
      type: "choice",
      prompt: "En ambulanse med blinkende blått lys kommer bakfra. Hva gjør du?",
      options: [
        { id: "fri-veg", text: "Kjører til side og gir fri veg, og stanser om nødvendig" },
        { id: "fortere", text: "Øker farten så du ikke er i veien" },
        { id: "brakk", text: "Bremser brått midt i feltet" },
        { id: "fortsett", text: "Fortsetter som før – den kan kjøre forbi selv" },
      ],
      correct: "fri-veg",
      explanation:
        "Du skal gi fri veg for utrykningskjøretøy som varsler med blinkende blått lys, og stanse om nødvendig. Gjør det rolig og forutsigbart.",
      rule: "Trafikkreglene § 10 nr. 1",
      highlight: ["ambulanse"],
    },
    {
      id: "utr-motende",
      type: "yesno",
      prompt: "Gjelder plikten til å gi fri veg også for den møtende bilen?",
      correct: true,
      explanation: "Plikten gjelder alle trafikanter, også møtende og kryssende trafikk.",
      rule: "Trafikkreglene § 10 nr. 1",
      highlight: ["motende", "ambulanse"],
    },
  ],
};
