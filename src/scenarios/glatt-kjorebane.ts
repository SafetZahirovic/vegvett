import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Glatt kjørebane: tilpass fart og avstand. */
export const glattKjorebane: Scenario = {
  id: "glatt-kjorebane",
  title: "Glatt kjørebane",
  topic: "fart",
  difficulty: 1,
  road: { type: "rett" },
  signs: [
    { id: "glatt-skilt", code: "116", pos: [HW + 1.5, 8], facing: "S" },
    { id: "svinger-skilt", code: "102.1", pos: [HW + 1.5, 20], facing: "S" },
  ],
  markings: [],
  vehicles: [
    {
      id: "foran",
      type: "personbil",
      name: "Bilen foran",
      pos: [LANE / 2, 26],
      heading: "N",
      color: "#b8c4d6",
      route: drive([LANE / 2, 26], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-9, 10] },
    { type: "tre", pos: [11, 30], size: 1.2 },
    { type: "tre", pos: [-12, 40] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "gl-skilt",
      type: "choice",
      prompt: "Hva varsler det første skiltet?",
      hidesSign: "glatt-skilt",
      options: [
        { id: "glatt", text: "Glatt kjørebane" },
        { id: "svinger", text: "Farlige svinger" },
        { id: "ujevn", text: "Ujevn veg" },
        { id: "grus", text: "Løs grus" },
      ],
      correct: "glatt",
      explanation: "Skilt 116 Glatt kjørebane varsler at vegen kan være spesielt glatt.",
      rule: "Skiltforskriften § 4 (skilt 116)",
      highlight: ["glatt-skilt"],
    },
    {
      id: "gl-handling",
      type: "choice",
      prompt: "Hva gjør du når det kan være glatt og det kommer svinger?",
      options: [
        { id: "fart-avstand", text: "Senker farten og øker avstanden til bilen foran" },
        { id: "brems", text: "Bremser hardt i hver sving" },
        { id: "samme", text: "Holder fartsgrensen, den gjelder uansett føre" },
        { id: "naer", text: "Legger meg tett bak bilen foran for å se sporene" },
      ],
      correct: "fart-avstand",
      explanation:
        "Farten skal tilpasses føre og sikt, og du må kunne stanse på den strekningen du har oversikt over. På glatt føre blir bremselengden mye lengre.",
      rule: "Vegtrafikkloven § 6 første ledd, trafikkreglene § 13 nr. 1",
      highlight: ["glatt-skilt", "svinger-skilt", "foran"],
    },
  ],
};
