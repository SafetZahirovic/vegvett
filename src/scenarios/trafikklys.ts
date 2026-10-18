import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Varsel om trafikklys og hva gult lys betyr. */
export const trafikklys: Scenario = {
  id: "trafikklys",
  title: "Trafikklys foran",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  signs: [{ id: "lys-skilt", code: "132", pos: [HW + 1.5, 10], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "foran",
      type: "personbil",
      name: "Bilen foran",
      pos: [LANE / 2, 22],
      heading: "N",
      color: "#ffd166",
      route: drive([LANE / 2, 22], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 14] },
    { type: "hus", pos: [16, 32] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "tl-skilt",
      type: "choice",
      prompt: "Hva varsler skiltet?",
      hidesSign: "lys-skilt",
      options: [
        { id: "lys", text: "Trafikklyssignal" },
        { id: "jernbane", text: "Jernbaneoverkjøring" },
        { id: "fotgjenger", text: "Lysregulert gangfelt" },
        { id: "bom", text: "Bomstasjon" },
      ],
      correct: "lys",
      explanation: "Skilt 132 Trafikklyssignal varsler trafikklys foran.",
      rule: "Skiltforskriften § 4 (skilt 132)",
      highlight: ["lys-skilt"],
    },
    {
      id: "tl-gult",
      type: "choice",
      prompt: "Lyset skifter fra grønt til gult. Hva betyr gult lys alene?",
      options: [
        { id: "stans", text: "Du skal stanse, med mindre du er så nær at du ikke kan stanse trygt" },
        { id: "gass", text: "Du skal øke farten for å rekke det" },
        { id: "gronn", text: "Grønt kommer straks" },
        { id: "forsiktig", text: "Du kan kjøre, men med forsiktighet" },
      ],
      correct: "stans",
      explanation:
        "Gult lys alene varsler at det straks blir rødt, og at du skal stanse. Du kan bare kjøre videre hvis du er så nær at du ikke kan stanse på en trygg måte.",
      rule: "Skiltforskriften § 24 A (signal 1080)",
      highlight: ["lys-skilt"],
    },
    {
      id: "tl-rodgult",
      type: "choice",
      prompt: "Hva betyr rødt og gult lys samtidig?",
      options: [
        { id: "gront", text: "Grønt lys kommer straks – vent til det blir grønt" },
        { id: "kjor", text: "Du kan kjøre hvis krysset er tomt" },
        { id: "rodt", text: "Rødt lys kommer straks" },
        { id: "feil", text: "Lyskrysset er ute av drift" },
      ],
      correct: "gront",
      explanation: "Rødt og gult lys samtidig betyr at grønt lys kommer straks. Du skal fortsatt vente.",
      rule: "Skiltforskriften § 24 A",
      highlight: ["lys-skilt"],
    },
    {
      id: "tl-blink",
      type: "choice",
      prompt: "Hva betyr blinkende gult lys?",
      options: [
        { id: "forsiktig", text: "Du skal være særlig forsiktig" },
        { id: "stans", text: "Du skal alltid stanse" },
        { id: "forkjor", text: "Du har forkjørsrett" },
        { id: "gront", text: "Grønt kommer straks" },
      ],
      correct: "forsiktig",
      explanation: "Blinkende gult lys betyr at du skal være særlig forsiktig. Vanlige vikepliktregler og skilt gjelder.",
      rule: "Skiltforskriften § 24 B (signal 1098)",
      highlight: ["lys-skilt"],
    },
  ],
};
