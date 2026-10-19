import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const FELT = HW + LANE / 2;

/** Kollektivfelt for bil: hvem kan kjøre der. */
export const kollektivfelt: Scenario = {
  id: "kollektivfelt",
  title: "Kollektivfelt",
  topic: "buss",
  difficulty: 2,
  licences: ["B"],
  road: { type: "rett" },
  roadExtras: [{ type: "kollektivfelt", from: 6, to: 120 }],
  signs: [{ id: "kollektiv-skilt", code: "508.1", pos: [HW + 4.8, 4], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "buss",
      type: "buss",
      name: "Bussen i kollektivfeltet",
      pos: [FELT, 30],
      heading: "N",
      color: "#ff8a65",
      route: drive([FELT, 30], "N", [["fwd", 30]]),
    },
    {
      id: "ko",
      type: "personbil",
      name: "Bilen foran deg",
      pos: [LANE / 2, 14],
      heading: "N",
      color: "#b8c4d6",
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 14] },
    { type: "hus", pos: [-15, 36] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "kf-bensin",
      type: "yesno",
      prompt: "Du kjører bensinbil. Kan du bruke kollektivfeltet for å komme forbi køen?",
      correct: false,
      explanation:
        "Kollektivfeltet er for buss, drosje og noen andre grupper. Vanlig bensin- eller dieselbil kan ikke bruke det, med mindre skilt eller oppmerking tillater det.",
      rule: "Trafikkreglene § 5 nr. 2",
      highlight: ["kollektiv-skilt"],
    },
    {
      id: "kf-elbil",
      type: "choice",
      prompt: "Skiltet har underskiltet «Gjelder ikke elmotorvogn». Hva betyr det for deg i elbil?",
      options: [
        { id: "ikke", text: "Du kan ikke bruke kollektivfeltet" },
        { id: "kan", text: "Du kan bruke det fordi bilen er elektrisk" },
        { id: "passasjer", text: "Du kan bruke det hvis du har passasjer" },
        { id: "natt", text: "Du kan bruke det om natta" },
      ],
      correct: "ikke",
      explanation:
        "Elbil kan i utgangspunktet bruke kollektivfelt, men underskiltet «Gjelder ikke elmotorvogn» tar bort den retten på denne strekningen.",
      rule: "Trafikkreglene § 5 nr. 2",
      highlight: ["kollektiv-skilt"],
    },
    {
      id: "kf-hvem",
      type: "choice",
      prompt: "Hvem kan bruke kollektivfeltet uten særskilt skilt?",
      options: [
        { id: "buss", text: "Buss, drosje, tohjuls motorsykkel, moped og sykkel" },
        { id: "alle", text: "Alle kjøretøy utenom rushtiden" },
        { id: "lastebil", text: "Lastebiler og varebiler" },
        { id: "tilhenger", text: "Biler med tilhenger" },
      ],
      correct: "buss",
      explanation:
        "Buss og drosje kan bruke kollektivfelt. Det kan også tohjuls motorsykkel uten sidevogn, moped og sykkel, med mindre skilt sier noe annet.",
      rule: "Trafikkreglene § 5 nr. 2",
      highlight: ["kollektiv-skilt", "buss"],
    },
    {
      id: "kf-stans",
      type: "yesno",
      prompt: "Kan du stanse kort i kollektivfeltet for å hente noen?",
      correct: false,
      explanation: "Det er forbudt å stanse i sykkelfelt, kollektivfelt og sambruksfelt.",
      rule: "Trafikkreglene § 17 nr. 1 g",
      highlight: ["kollektiv-skilt"],
    },
  ],
};
