import { HW, LANE } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import { PLAYER_ID, type Scenario } from "./types";

const AT = 26;

/** Forkjørsveg + venstresving + møtende trafikk + bil i sidevegen med vikeplikt. */
export const kombinasjonVenstresving: Scenario = {
  id: "kombinasjon-venstresving",
  title: "Venstresving fra forkjørsveg",
  topic: "vikeplikt",
  difficulty: 3,
  road: { type: "t-kryss", at: AT, branch: "left" },
  signs: [
    { id: "forkjorsveg", code: "206", pos: [HW + 1.5, 6], facing: "S" },
    // Gjelder trafikk ut fra sidevegen til venstre (kjører mot øst).
    { id: "vikeplikt", code: "202", pos: [-HW - 3, AT - HW - 1.5], facing: "W" },
  ],
  markings: [
    { id: "vikelinje", type: "vikelinje", a: [-HW - 0.5, AT - LANE], b: [-HW - 0.5, AT - 0.15], toward: "W" },
  ],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      ...junctionStart("N", AT, 16),
      color: "#ff8a65",
      route: junctionRoute({ from: "N", turn: "straight", at: AT, start: 16 }),
    },
    {
      id: "sidebil",
      type: "personbil",
      name: "Bilen i sidevegen",
      ...junctionStart("W", AT, HW + 4.8),
      color: "#ffd166",
      indicator: "right",
      route: junctionRoute({ from: "W", turn: "right", at: AT, start: HW + 4.8 }),
    },
  ],
  decor: [
    { type: "hus", pos: [-16, 10] },
    { type: "tre", pos: [10, 14] },
    { type: "tre", pos: [12, 38], size: 1.2 },
  ],
  player: { indicator: "left", route: junctionRoute({ from: "S", turn: "left", at: AT, start: AT }) },
  questions: [
    {
      id: "komb-motende",
      type: "yesno",
      prompt: "Du kjører på forkjørsveg og skal svinge til venstre. Har du vikeplikt for den møtende bilen?",
      correct: true,
      explanation:
        "Forkjørsvegen gir deg forkjørsrett overfor sidevegen, ikke overfor møtende. Når du svinger til venstre, kommer den møtende bilen fra din høyre side, og du har vikeplikt for den.",
      rule: "Trafikkreglene § 7 nr. 2 annet punktum",
      highlight: ["motende"],
    },
    {
      id: "komb-rekkefolge",
      type: "order",
      prompt: "Sett kjøretøyene i riktig rekkefølge.",
      correct: ["motende", PLAYER_ID, "sidebil"],
      explanation:
        "Den møtende bilen kjører først, fordi du svinger til venstre. Så kjører du. Bilen i sidevegen har skilt 202 og vikelinje og kjører sist.",
      rule: "Trafikkreglene § 7 nr. 2, skiltforskriften § 6 (skilt 202 og 206)",
      highlight: ["motende", PLAYER_ID, "sidebil", "vikeplikt"],
    },
  ],
};
