import { HW } from "../scene/road";
import { drive, junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 26;
const STOP = AT - HW - 4.5;
const EAST = HW + 2.5;

/** Lyskryss: høyresving på grønt med gående som krysser. */
export const lyskryss: Scenario = {
  id: "lyskryss",
  title: "Høyre på grønt i lyskryss",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [],
  lights: [
    { id: "lys", pos: [HW + 1.2, STOP + 0.5], facing: "S", state: "gronn" },
    { id: "lys-tvers", pos: [-HW - 1.2, AT - HW - 1.5], facing: "E", state: "rod" },
  ],
  markings: [
    { id: "stopplinje", type: "stopplinje", a: [0.15, STOP], b: [HW - 0.25, STOP] },
    { id: "gangfelt", type: "gangfelt", a: [EAST, AT - HW], b: [EAST, AT + HW], width: 3 },
  ],
  vehicles: [
    {
      id: "venter",
      type: "personbil",
      name: "Bilen som venter på rødt",
      ...junctionStart("W", AT, HW + 6),
      color: "#ff8a65",
    },
  ],
  pedestrians: [
    {
      id: "gaende",
      name: "Fotgjengeren som går rett fram",
      pos: [EAST, AT - HW - 1.2],
      heading: "N",
      route: drive([EAST, AT - HW - 1.2], "N", [["fwd", 2 * HW + 2.4]]),
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 12] },
    { type: "hus", pos: [16, 12] },
    { type: "hus", pos: [-16, 42] },
    { type: "tre", pos: [14, 42] },
  ],
  player: { indicator: "right", route: junctionRoute({ from: "S", turn: "right", at: AT, start: AT }) },
  view: { focus: [2, 22] },
  questions: [
    {
      id: "lk-hoyre-gaende",
      type: "click",
      prompt: "Du har grønt lys og skal til høyre. Klikk på den du må vike for.",
      correct: "gaende",
      explanation:
        "Grønt lys gir deg lov til å kjøre, men ikke forkjørsrett. Når du svinger, har du vikeplikt for gående og syklende som går eller sykler rett fram på samme side.",
      rule: "Trafikkreglene § 7 nr. 3",
      highlight: ["gaende", "gangfelt"],
    },
    {
      id: "lk-gronn",
      type: "choice",
      prompt: "Hva betyr grønt lys?",
      options: [
        { id: "fri", text: "Du kan kjøre, men bare hvis vegen er fri" },
        { id: "forkjors", text: "Du har forkjørsrett for alle" },
        { id: "fort", text: "Du må kjøre før det blir gult" },
        { id: "stans", text: "Du skal stanse og se deg for" },
      ],
      correct: "fri",
      explanation:
        "Grønt lys betyr at du kan kjøre forbi signalet. Du må likevel vike for dem du har vikeplikt for, og ikke kjøre inn i krysset hvis du blir stående der.",
      rule: "Skiltforskriften § 24 (signal 1080) og trafikkreglene § 5 nr. 4",
      highlight: ["lys"],
    },
    {
      id: "lk-hoyre-rodt",
      type: "yesno",
      prompt: "Kan du svinge til høyre på rødt lys når det er klart?",
      correct: false,
      explanation:
        "Nei. I Norge gjelder rødt lys for alle retninger signalet regulerer. Du skal stanse ved stopplinjen og vente på grønt.",
      rule: "Skiltforskriften § 24 (signal 1080)",
      highlight: ["lys", "stopplinje"],
    },
    {
      id: "lk-stopplinje",
      type: "choice",
      prompt: "Lyset er rødt. Hvor skal du stanse?",
      options: [
        { id: "linje", text: "Før stopplinjen" },
        { id: "lys", text: "Rett ved siden av lyset, selv om stopplinjen er før" },
        { id: "gangfelt", text: "I gangfeltet, så du ser bedre" },
        { id: "kryss", text: "Litt inn i krysset" },
      ],
      correct: "linje",
      explanation: "Ved rødt lys skal du stanse før stopplinjen. Er det ingen stopplinje, stanser du før signalet.",
      rule: "Skiltforskriften § 24 (signal 1080)",
      highlight: ["stopplinje"],
    },
    {
      id: "lk-blokkere",
      type: "yesno",
      prompt: "Du har grønt, men køen står stille i krysset. Kan du kjøre inn og vente der?",
      correct: false,
      explanation:
        "Du skal ikke kjøre inn i et kryss hvis du risikerer å bli stående der og hindre kryssende trafikk, selv om du har grønt.",
      rule: "Trafikkreglene § 5 nr. 4",
      highlight: ["lys"],
    },
    {
      id: "lk-avslatt",
      type: "choice",
      prompt: "Trafikklysene er slått av. Hva gjelder da?",
      options: [
        { id: "skilt", text: "Skiltene, og ellers vanlige vikepliktregler som høyreregelen" },
        { id: "rodt", text: "Det samme som rødt lys – alle skal stanse" },
        { id: "storst", text: "Den største vegen har alltid forkjørsrett" },
        { id: "fritt", text: "Ingen regler, alle kjører forsiktig" },
      ],
      correct: "skilt",
      explanation:
        "Lyssignaler går foran skilt og vikepliktregler. Når lysene er av eller blinker gult, gjelder skiltene og ellers de vanlige vikepliktreglene.",
      rule: "Trafikkreglene § 3 nr. 1",
      highlight: ["lys"],
    },
  ],
};
