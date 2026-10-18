import { HW, LANE } from "../scene/road";
import type { Scenario } from "./types";

const half = LANE / 2;

/** Vegarbeid med innsnevring og nedsatt fart. */
export const vegarbeid: Scenario = {
  id: "vegarbeid",
  title: "Vegarbeid",
  topic: "skilt",
  difficulty: 1,
  road: { type: "rett" },
  roadExtras: [{ type: "smalt", from: 24, to: 44 }],
  signs: [
    { id: "vegarbeid-skilt", code: "110", pos: [HW + 1.5, 6], facing: "S" },
    { id: "fart", code: "362", value: 50, pos: [HW + 1.5, 13], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  pedestrians: [
    { id: "arbeider", name: "Vegarbeideren", pos: [HW - 0.6, 33], heading: "W", color: "#ffb347" },
  ],
  decor: [
    { type: "tre", pos: [-10, 14] },
    { type: "tre", pos: [12, 22] },
  ],
  player: {
    route: {
      turn: "straight",
      points: [
        [half, 0],
        [half, 20],
        [0.4, 26],
        [0.4, 42],
        [half, 48],
        [half, 60],
      ],
    },
  },
  questions: [
    {
      id: "va-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "vegarbeid-skilt",
      options: [
        { id: "vegarbeid", text: "Vegarbeid" },
        { id: "ujevn", text: "Ujevn veg" },
        { id: "steinsprut", text: "Steinsprut" },
        { id: "annen", text: "Annen fare" },
      ],
      correct: "vegarbeid",
      explanation: "Skilt 110 Vegarbeid varsler arbeid på eller ved vegen.",
      rule: "Skiltforskriften § 4 (skilt 110)",
      highlight: ["vegarbeid-skilt"],
    },
    {
      id: "va-handling",
      type: "choice",
      prompt: "Hvordan kjører du forbi vegarbeidet?",
      options: [
        { id: "rolig", text: "Senker farten, holder avstand og følger skilt og anvisninger" },
        { id: "samme", text: "Holder samme fart – det er jo ingen andre biler" },
        { id: "forbi", text: "Kjører forbi så fort som mulig for å ikke hindre arbeidet" },
        { id: "tut", text: "Tuter for å varsle arbeiderne" },
      ],
      correct: "rolig",
      explanation:
        "Ved vegarbeid er det folk og maskiner nær vegen. Følg den skiltede fartsgrensen og vær aktpågivende og varsom.",
      rule: "Vegtrafikkloven § 3, skiltforskriften § 8 (skilt 362)",
      highlight: ["arbeider", "fart"],
    },
  ],
};
