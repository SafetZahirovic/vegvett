import { HW } from "../scene/road";
import { curveRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 26;
const R = 20;

/** MC: grus i svingen, og regler for tilhenger. */
export const mcGrusTilhenger: Scenario = {
  id: "mc-grus-tilhenger",
  title: "MC: grus og tilhenger",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "kurve", at: AT, side: "right", radius: R },
  signs: [
    { id: "glatt", code: "116", pos: [HW + 1.5, 6], facing: "S" },
    { id: "fart", code: "362", value: 90, pos: [HW + 1.5, 14], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  decor: [
    { type: "tre", pos: [-9, 12] },
    { type: "tre", pos: [-12, 34] },
  ],
  view: { focus: [4, 20] },
  player: { route: curveRoute(AT, "right", R) },
  questions: [
    {
      id: "mcgt-grus",
      type: "choice",
      prompt: "Du ser grus i svingen foran. Hva gjør du?",
      options: [
        { id: "for", text: "Senker farten før svingen og unngår brå bremsing og styring i grusen" },
        { id: "brems", text: "Bremser hardt midt i grusen" },
        { id: "gass", text: "Gir gass for å komme raskt gjennom" },
        { id: "lene", text: "Lener ekstra mye for å holde linjen" },
      ],
      correct: "for",
      explanation:
        "Se etter grus og dårlig dekke langt framme, og tilpass farten før svingen. Brå bremsing eller styring på grus kan gi fall.",
      rule: "Statens vegvesen, Sikker på MC (veiledning); vegtrafikkloven § 6",
      highlight: ["glatt"],
    },
    {
      id: "mcgt-tilhenger-fart",
      type: "choice",
      prompt: "Du kjører MC med tilhenger. Fartsgrensen er 90. Hvor fort kan du kjøre?",
      options: [
        { id: "80", text: "80 km/t" },
        { id: "90", text: "90 km/t" },
        { id: "60", text: "60 km/t" },
        { id: "70", text: "70 km/t" },
      ],
      correct: "80",
      explanation: "Med tilhenger er høyeste tillatte fart 80 km/t, også der fartsgrensen er høyere.",
      rule: "Trafikkreglene § 13 nr. 4",
      highlight: ["fart"],
    },
    {
      id: "mcgt-a1",
      type: "yesno",
      prompt: "Kan en lett motorsykkel på 125 cm³ trekke tilhenger?",
      correct: false,
      explanation: "Motorsykkel kan bare trekke tilhenger når slagvolumet er over 125 cm³.",
      rule: "Bruksforskriften § 4-2 nr. 1",
      highlight: [],
    },
  ],
};
