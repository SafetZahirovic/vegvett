import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Reinflokk i vegbanen. */
export const rein: Scenario = {
  id: "rein",
  title: "Rein i vegen",
  topic: "dyr",
  difficulty: 1,
  road: { type: "rett" },
  signs: [{ id: "rein-skilt", code: "146.2", pos: [HW + 1.5, 6], facing: "S" }],
  markings: [],
  vehicles: [],
  animals: [
    { id: "rein-1", type: "rein", name: "Reinen i ditt felt", pos: [1.2, 24], heading: "W" },
    { id: "rein-2", type: "rein", name: "Reinen i midten", pos: [-0.6, 27], heading: "E" },
    { id: "rein-3", type: "rein", name: "Reinen i motsatt felt", pos: [-2.2, 22], heading: 200 },
  ],
  decor: [
    { type: "tre", pos: [-12, 10], size: 0.7 },
    { type: "tre", pos: [14, 30], size: 0.8 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "rein-handling",
      type: "choice",
      prompt: "Det står rein i vegen foran deg. Hva gjør du?",
      options: [
        { id: "tut", text: "Tuter og kjører rett gjennom flokken" },
        { id: "vent", text: "Senker farten, stanser om nødvendig og venter til vegen er fri" },
        { id: "forbi", text: "Kjører forbi i motsatt felt uten å senke farten" },
        { id: "sving", text: "Svinger brått rundt dem" },
      ],
      correct: "vent",
      explanation:
        "Rein kan plutselig bevege seg ut i vegen igjen. Vær aktpågivende og varsom: senk farten, stans om nødvendig og kjør rolig forbi når det er trygt.",
      rule: "Vegtrafikkloven § 3",
      highlight: ["rein-1", "rein-2", "rein-3"],
    },
    {
      id: "rein-ulykke",
      type: "yesno",
      prompt: "Hvis du kjører på et dyr, må du stanse og hjelpe så godt du kan?",
      correct: true,
      explanation:
        "Den som er innblandet i en trafikkulykke, skal straks stanse og hjelpe skadde – det gjelder også dyr.",
      rule: "Vegtrafikkloven § 12",
      highlight: [],
    },
  ],
};
