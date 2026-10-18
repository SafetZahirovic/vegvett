import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

const AT = 20;

/** Uregulert gangfelt: vikeplikt for gående som er i eller på vei ut i gangfeltet. */
export const gangfelt: Scenario = {
  id: "gangfelt",
  title: "Gangfelt",
  topic: "gangfelt",
  difficulty: 1,
  road: { type: "rett" },
  signs: [
    { id: "gangfelt-skilt", code: "516", pos: [HW + 1.4, AT - 2.5], facing: "S" },
    { id: "gangfelt-skilt-motsatt", code: "516", pos: [-HW - 1.4, AT + 2.5], facing: "N" },
  ],
  markings: [{ id: "gangfelt", type: "gangfelt", a: [-HW, AT], b: [HW, AT], width: 3.5 }],
  vehicles: [],
  pedestrians: [
    {
      id: "pa-vei-ut",
      name: "Fotgjengeren på vei ut i gangfeltet",
      pos: [HW + 0.6, AT],
      heading: "W",
      route: drive([HW + 0.6, AT], "W", [["fwd", 2 * HW + 1.6]]),
    },
    {
      id: "pa-fortauet",
      name: "Fotgjengeren som går langs vegen",
      pos: [-HW - 2, AT + 7],
      heading: "N",
      color: "#9be7ff",
      route: drive([-HW - 2, AT + 7], "N", [["fwd", 10]]),
    },
  ],
  decor: [
    { type: "hus", pos: [-14, 10] },
    { type: "hus", pos: [15, 34] },
    { type: "tre", pos: [10, 8] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "gf-hvem",
      type: "click",
      prompt: "Klikk på fotgjengeren du har vikeplikt for.",
      correct: "pa-vei-ut",
      explanation:
        "Ved et uregulert gangfelt har du vikeplikt for gående som er i gangfeltet eller på vei ut i det. Den som går langs vegen, skal ikke krysse.",
      rule: "Trafikkreglene § 9 nr. 2",
      highlight: ["pa-vei-ut", "gangfelt"],
    },
    {
      id: "gf-skilt",
      type: "choice",
      prompt: "Hva betyr det blå skiltet ved gangfeltet?",
      hidesSign: "gangfelt-skilt",
      options: [
        { id: "gangfelt", text: "Gangfelt" },
        { id: "gangveg", text: "Gang- og sykkelveg" },
        { id: "barn", text: "Barn leker" },
        { id: "fortau", text: "Fortau" },
      ],
      correct: "gangfelt",
      explanation: "Skilt 516 Gangfelt viser hvor gangfeltet er. Oppmerkingen (1024) har samme virkning som skiltet.",
      rule: "Skiltforskriften § 12 (skilt 516)",
      highlight: ["gangfelt-skilt", "gangfelt"],
    },
    {
      id: "gf-stanse",
      type: "yesno",
      prompt: "Det er kø forbi gangfeltet. Kan du stanse slik at bilen blir stående i gangfeltet?",
      correct: false,
      explanation: "Du skal unngå å stanse i gangfeltet, så gående kommer trygt over. Vent før gangfeltet til det er plass.",
      rule: "Trafikkreglene § 9 nr. 4",
      highlight: ["gangfelt"],
    },
    {
      id: "gf-forbi",
      type: "yesno",
      prompt: "Bilen foran deg stanser foran gangfeltet. Kan du kjøre forbi den?",
      correct: false,
      explanation:
        "Bilen kan skjule gående som er på vei over. Du skal ikke kjøre forbi når sikten mot gangfeltet er hindret.",
      rule: "Trafikkreglene § 12 nr. 6",
      highlight: ["gangfelt"],
    },
  ],
};
