import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Tunnel foran. */
export const tunnel: Scenario = {
  id: "tunnel",
  title: "Tunnel",
  topic: "skilt",
  difficulty: 1,
  road: { type: "rett" },
  centerLine: [{ type: "midtlinje", to: 18 }, { type: "sperrelinje", from: 18 }],
  signs: [
    { id: "tunnel-skilt", code: "122", pos: [HW + 1.5, 8], facing: "S" },
    { id: "fart", code: "362", value: 70, pos: [HW + 1.5, 16], facing: "S" },
  ],
  markings: [],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      pos: [-LANE / 2, 38],
      heading: "S",
      color: "#ff8a65",
      route: drive([-LANE / 2, 38], "S", [["fwd", 60]]),
    },
  ],
  decor: [
    { type: "hus", pos: [-12, 34], size: 1.6 },
    { type: "hus", pos: [12, 34], size: 1.6 },
    { type: "tre", pos: [-10, 12] },
    { type: "tre", pos: [11, 20] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "tu-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "tunnel-skilt",
      options: [
        { id: "tunnel", text: "Tunnel" },
        { id: "bru", text: "Bru" },
        { id: "ras", text: "Rasfare" },
        { id: "port", text: "Bomstasjon" },
      ],
      correct: "tunnel",
      explanation: "Skilt 122 Tunnel varsler at det kommer en tunnel.",
      rule: "Skiltforskriften § 4 (skilt 122)",
      highlight: ["tunnel-skilt"],
    },
    {
      id: "tu-lys",
      type: "yesno",
      prompt: "Skal du ha lyset på når du kjører i tunnelen?",
      correct: true,
      explanation: "Motorvogn skal ha tent lys under kjøring – også i tunnel, hele døgnet.",
      rule: "Trafikkreglene § 15",
      highlight: [],
    },
  ],
};
