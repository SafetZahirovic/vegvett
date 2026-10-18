import { HW, LANE } from "../scene/road";
import { junctionRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 26;

export const xKryssStopp: Scenario = {
  id: "x-kryss-stopp",
  title: "Kryss med stoppskilt",
  topic: "vikeplikt",
  difficulty: 1,
  road: { type: "x-kryss", at: AT },
  signs: [{ id: "stopp", code: "204", pos: [HW + 1.5, AT - HW - 3], facing: "S" }],
  markings: [{ id: "stopplinje", type: "stopplinje", a: [0.15, AT - HW - 1], b: [HW - 0.25, AT - HW - 1] }],
  vehicles: [
    // Kryssende trafikk fra venstre, kjører mot øst i sitt høyre felt.
    {
      id: "kryssende",
      type: "personbil",
      name: "Den oransje bilen",
      pos: [-14, AT - LANE / 2],
      heading: "E",
      color: "#ff8a65",
      route: junctionRoute({ from: "W", turn: "straight", at: AT, start: 14 }),
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 10] },
    { type: "tre", pos: [11, 12] },
    { type: "tre", pos: [13, 40], size: 1.2 },
    { type: "tre", pos: [-12, 42] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "stopp-handling",
      type: "choice",
      prompt: "Hva må du gjøre ved stoppskiltet?",
      options: [
        { id: "senke", text: "Senke farten og kjøre hvis det er klart" },
        { id: "trafikk", text: "Stanse bare hvis det kommer trafikk" },
        { id: "stanse", text: "Stanse helt ved stopplinjen, og så vike for kryssende trafikk" },
        { id: "skiltet", text: "Stanse ved skiltet, uansett hvor stopplinjen er" },
      ],
      correct: "stanse",
      explanation:
        "Ved skilt 204 Stopp skal du alltid stanse helt ved stopplinjen, også når vegen er fri. Deretter har du vikeplikt for kryssende trafikk.",
      rule: "Skiltforskriften § 6 (skilt 204)",
      highlight: ["stopp", "stopplinje"],
    },
    {
      id: "venstre-viker",
      type: "yesno",
      prompt: "Har den oransje bilen som kommer fra venstre, vikeplikt for deg?",
      correct: false,
      explanation:
        "Stoppskiltet gir deg vikeplikt for all kryssende trafikk, også den som kommer fra venstre. Høyreregelen gjelder ikke her.",
      rule: "Skiltforskriften § 6 (skilt 204)",
      highlight: ["stopp", "kryssende"],
    },
  ],
};
