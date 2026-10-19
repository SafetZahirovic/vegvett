import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const AT = 28;

/** Planovergang med bom. */
export const planovergang: Scenario = {
  id: "planovergang",
  title: "Planovergang",
  topic: "sikkerhet",
  difficulty: 2,
  road: { type: "rett" },
  roadExtras: [{ type: "jernbane", at: AT, bom: true }],
  signs: [{ id: "plan-skilt", code: "134", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [{ id: "stopplinje", type: "stopplinje", a: [0.15, AT - 6], b: [HW - 0.25, AT - 6] }],
  vehicles: [],
  decor: [
    { type: "tre", pos: [-10, 12] },
    { type: "tre", pos: [12, 16] },
    { type: "hus", pos: [-16, 42] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "po-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "plan-skilt",
      options: [
        { id: "bom", text: "Planovergang med bom" },
        { id: "uten", text: "Planovergang uten bom" },
        { id: "bomstasjon", text: "Bomstasjon" },
        { id: "vegarbeid", text: "Vegarbeid" },
      ],
      correct: "bom",
      explanation: "Skilt 134 varsler planovergang med bom. Skilt 135 betyr planovergang uten bom.",
      rule: "Skiltforskriften § 4 (skilt 134 og 135)",
      highlight: ["plan-skilt"],
    },
    {
      id: "po-rodt",
      type: "choice",
      prompt: "Det blinker rødt ved planovergangen. Hva gjør du?",
      options: [
        { id: "stans", text: "Stanser ved stopplinjen eller i trygg avstand" },
        { id: "fort", text: "Kjører fort over før bommen går ned" },
        { id: "forsiktig", text: "Kjører forsiktig over hvis du ikke ser toget" },
        { id: "rygg", text: "Rygger bort fra overgangen" },
      ],
      correct: "stans",
      explanation: "Rødt blinklys ved planovergang betyr at du skal stanse ved stopplinjen eller i trygg avstand.",
      rule: "Skiltforskriften § 24 (signal 1096)",
      highlight: ["stopplinje"],
    },
    {
      id: "po-avstand",
      type: "choice",
      prompt: "Hvor nær planovergangen er det forbudt å stanse?",
      options: [
        { id: "5", text: "Nærmere enn 5 meter" },
        { id: "1", text: "Nærmere enn 1 meter" },
        { id: "20", text: "Nærmere enn 20 meter" },
        { id: "ingen", text: "Det finnes ingen regel" },
      ],
      correct: "5",
      explanation: "Du må ikke stanse nærmere en planovergang enn 5 meter.",
      rule: "Trafikkreglene § 17 nr. 1 f",
      highlight: [],
    },
    {
      id: "po-sikret",
      type: "yesno",
      prompt: "Planovergangen har bom og lys. Må du likevel selv se etter tog?",
      correct: true,
      explanation:
        "Du skal alltid være oppmerksom på tog, også ved sikret planovergang, og holde så lav fart at du kan stanse i trygg avstand.",
      rule: "Trafikkreglene § 10 nr. 2",
      highlight: ["plan-skilt"],
    },
  ],
};
