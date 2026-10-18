import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const half = LANE / 2;

/** MC: kjøring i gruppe og bremsing. */
export const mcGruppe: Scenario = {
  id: "mc-gruppe",
  title: "MC: kjøring i gruppe",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "rett" },
  signs: [{ id: "fart", code: "362", value: 80, pos: [HW + 1.5, 6], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "mc-1",
      type: "motorsykkel",
      name: "Første MC i gruppa",
      pos: [1.25, 26],
      heading: "N",
      color: "#ffd166",
      route: drive([1.25, 26], "N", [["fwd", 30]]),
    },
    {
      id: "mc-2",
      type: "motorsykkel",
      name: "Andre MC i gruppa",
      pos: [2.2, 14],
      heading: "N",
      color: "#ff8a65",
      route: drive([2.2, 14], "N", [["fwd", 30]]),
    },
  ],
  decor: [
    { type: "tre", pos: [-10, 12] },
    { type: "tre", pos: [12, 30] },
  ],
  player: { route: drive([half, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mcg-rad",
      type: "choice",
      prompt: "Du kjører i gruppe. Hva er Statens vegvesens råd?",
      options: [
        { id: "avstand", text: "Hold god avstand, og ikke la deg presse til å holde følge" },
        { id: "tett", text: "Kjør tett, så bilister ikke kjører inn mellom" },
        { id: "fart", text: "Hold samme fart som den raskeste i gruppa" },
        { id: "side", text: "Kjør to og to i bredden" },
      ],
      correct: "avstand",
      explanation: "Hold god avstand til de du kjører sammen med, og kjør i ditt eget tempo.",
      rule: "Statens vegvesen, Sikker på MC (veiledning)",
      highlight: ["mc-1", "mc-2"],
    },
    {
      id: "mcg-regel",
      type: "choice",
      prompt: "Hva sier trafikkreglene om avstanden til kjøretøyet foran?",
      options: [
        { id: "stanse", text: "Den skal hindre påkjøring hvis den foran bremser, og gi plass til at en forbikjørende kan kjøre inn" },
        { id: "2s", text: "Minst to sekunder i all slags vær" },
        { id: "gruppe", text: "Motorsykler i gruppe er unntatt fra avstandskrav" },
        { id: "ingen", text: "Ingenting" },
      ],
      correct: "stanse",
      explanation:
        "Avstanden skal være så stor at du unngår påkjøring om den foran bremser, og slik at en forbikjørende kan kjøre inn mellom.",
      rule: "Trafikkreglene § 5 nr. 3",
      highlight: ["mc-2"],
    },
    {
      id: "mcg-brems",
      type: "choice",
      prompt: "Hvordan bremser du normalt på MC?",
      options: [
        { id: "begge", text: "Med begge bremsene" },
        { id: "bak", text: "Bare med bakbremsen" },
        { id: "for", text: "Bare med forbremsen" },
        { id: "motor", text: "Bare med motorbrems" },
      ],
      correct: "begge",
      explanation: "Normal bremsing gjøres med begge bremsene.",
      rule: "Statens vegvesen, læreplan klasse A (veiledning)",
      highlight: [],
    },
  ],
};
