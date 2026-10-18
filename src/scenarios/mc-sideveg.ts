import { HW, LANE } from "../scene/road";
import { drive, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 28;

/** MC: bil i sidevegen har stanset ved vikelinjen. */
export const mcSideveg: Scenario = {
  id: "mc-sideveg",
  title: "MC: bil i sidevegen",
  topic: "motorsykkel",
  difficulty: 1,
  licences: ["A"],
  road: { type: "t-kryss", at: AT, branch: "right" },
  signs: [
    { id: "forkjorsveg", code: "206", pos: [HW + 1.5, 8], facing: "S" },
    // Gjelder trafikk ut fra sidevegen (kjører mot vest i feltet nærmest deg).
    { id: "vikeplikt", code: "202", pos: [HW + 3, AT + HW + 1.5], facing: "E" },
  ],
  markings: [
    { id: "vikelinje", type: "vikelinje", a: [HW + 0.5, AT + 0.15], b: [HW + 0.5, AT + LANE], toward: "E" },
  ],
  vehicles: [
    {
      id: "sidebil",
      type: "personbil",
      name: "Bilen i sidevegen",
      ...junctionStart("E", AT, HW + 4.8),
      color: "#ffd166",
      indicator: "left",
    },
  ],
  decor: [
    { type: "hus", pos: [18, 14] },
    { type: "tre", pos: [-10, 14] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "mcs-handling",
      type: "choice",
      prompt: "Bilen i sidevegen har stanset ved vikelinjen. Hva gjør du?",
      options: [
        { id: "utvei", text: "Regner med at den kan kjøre ut likevel, og planlegger en utvei" },
        { id: "sett", text: "Fortsetter som før – den har jo sett deg" },
        { id: "fort", text: "Øker farten forbi krysset" },
        { id: "stans", text: "Stanser helt og vinker den ut" },
      ],
      correct: "utvei",
      explanation:
        "Ikke ta for gitt at du er sett, selv om bilen har stanset. Senk farten, søk øyekontakt og ha en plan hvis den kjører ut.",
      rule: "Statens vegvesen, Sikker på MC (veiledning)",
      highlight: ["sidebil"],
    },
    {
      id: "mcs-vikeplikt",
      type: "yesno",
      prompt: "Har bilen i sidevegen vikeplikt for deg?",
      correct: true,
      explanation: "Du kjører på forkjørsveg, og sidevegen har skilt 202 og vikelinje.",
      rule: "Skiltforskriften § 6 (skilt 202 og 206)",
      highlight: ["vikeplikt", "vikelinje"],
    },
  ],
};
