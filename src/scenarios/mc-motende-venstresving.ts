import { HW } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 26;

/** MC: møtende bil skal svinge til venstre foran deg – en vanlig ulykkestype. */
export const mcMotendeVenstresving: Scenario = {
  id: "mc-motende-venstresving",
  title: "MC: møtende svinger foran deg",
  topic: "motorsykkel",
  difficulty: 2,
  licences: ["A"],
  road: { type: "t-kryss", at: AT, branch: "right" },
  signs: [{ id: "forkjorsveg", code: "206", pos: [HW + 1.5, 6], facing: "S" }],
  markings: [],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      ...junctionStart("N", AT, 9),
      color: "#ff8a65",
      indicator: "left",
      route: junctionRoute({ from: "N", turn: "left", at: AT, start: 9 }),
    },
  ],
  decor: [
    { type: "hus", pos: [20, 40] },
    { type: "tre", pos: [-10, 14] },
    { type: "tre", pos: [12, 14] },
  ],
  player: { route: junctionRoute({ from: "S", turn: "straight", at: AT, start: AT }) },
  questions: [
    {
      id: "mcm-handling",
      type: "choice",
      prompt: "Den møtende bilen skal svinge til venstre inn i sidevegen, foran deg. Hva gjør du?",
      options: [
        { id: "klar", text: "Senker farten og er klar til å bremse – ikke regn med at du er sett" },
        { id: "fortsett", text: "Holder farten, bilen har vikeplikt" },
        { id: "fort", text: "Øker farten for å komme forbi før den svinger" },
        { id: "tut", text: "Tuter og fortsetter" },
      ],
      correct: "klar",
      explanation:
        "Bilen har vikeplikt for deg, men en MC er liten og lett å overse. Regn med at føreren kan svinge likevel, og ha en utvei klar.",
      rule: "Statens vegvesen, Sikker på MC (veiledning); vegtrafikkloven § 3",
      highlight: ["motende"],
    },
    {
      id: "mcm-vikeplikt",
      type: "yesno",
      prompt: "Har den møtende bilen som skal svinge til venstre, vikeplikt for deg?",
      correct: true,
      explanation: "Den som svinger til venstre, får deg på sin høyre side og har vikeplikt for deg.",
      rule: "Trafikkreglene § 7 nr. 2 annet punktum",
      highlight: ["motende"],
    },
    {
      id: "mcm-hvorfor",
      type: "choice",
      prompt: "Hvorfor blir motorsykler ofte oversett i slike situasjoner?",
      options: [
        { id: "liten", text: "MC er liten, så fart og avstand er vanskelig å bedømme" },
        { id: "lys", text: "Motorsykler kjører uten lys" },
        { id: "fort", text: "Motorsykler kjører alltid fortere enn fartsgrensen" },
        { id: "lyd", text: "Motorsykler lager ikke lyd" },
      ],
      correct: "liten",
      explanation:
        "En motorsykkel er smal og liten. Andre trafikanter kan feilberegne både farten og avstanden din.",
      rule: "Statens vegvesen, Sikker på MC (veiledning)",
      highlight: [],
    },
  ],
};
