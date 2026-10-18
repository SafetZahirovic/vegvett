import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Skilt 334: forbud mot forbikjøring selv om midtlinjen er stiplet. */
export const forbikjoringsforbud: Scenario = {
  id: "forbikjoringsforbud",
  title: "Forbikjøringsforbud",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  signs: [{ id: "forbud", code: "334", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "treg",
      type: "personbil",
      name: "Den trege bilen",
      pos: [LANE / 2, 18],
      heading: "N",
      color: "#b8c4d6",
      route: drive([LANE / 2, 18], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-10, 6] },
    { type: "hus", pos: [-16, 30] },
    { type: "tre", pos: [11, 32] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 13]]) },
  questions: [
    {
      id: "forbud-betydning",
      type: "choice",
      prompt: "Hva betyr skiltet?",
      hidesSign: "forbud",
      options: [
        { id: "forbud", text: "Forbikjøringsforbud" },
        { id: "mote", text: "Møtende trafikk har vikeplikt" },
        { id: "motorvogn", text: "Kjøring med motorvogn forbudt" },
        { id: "felt", text: "Påbudt kjørefelt" },
      ],
      correct: "forbud",
      explanation:
        "Skilt 334 Forbikjøringsforbud: du kan ikke kjøre forbi motorvogn med mer enn to hjul. Forbudet varer til skilt 336 eller så langt underskilt angir.",
      rule: "Skiltforskriften § 8 (skilt 334)",
      highlight: ["forbud"],
    },
    {
      id: "forbud-stiplet",
      type: "yesno",
      prompt: "Midtlinjen er stiplet. Kan du da kjøre forbi den trege bilen?",
      correct: false,
      explanation:
        "Skiltet gjelder uansett om midtlinjen er stiplet. Den trege bilen er en motorvogn med fire hjul, så du kan ikke kjøre forbi.",
      rule: "Skiltforskriften § 8 (skilt 334)",
      highlight: ["forbud", "treg"],
    },
  ],
};
