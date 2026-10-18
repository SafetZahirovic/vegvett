import { HW, RB_OUTER } from "../scene/road";
import { junctionStart, roundaboutRoute } from "./routes";
import type { Scenario } from "./types";

const AT = 28;
const ENTRY = AT - RB_OUTER - 0.8;
const ventende = junctionStart("E", AT, RB_OUTER + 4);

/** Ut av rundkjøring: blink til høyre i god tid før avkjøringen. */
export const rundkjoringUt: Scenario = {
  id: "rundkjoring-ut",
  title: "Ut av rundkjøring",
  topic: "rundkjoring",
  difficulty: 2,
  road: { type: "rundkjoring", at: AT },
  view: { focus: [0, 20] },
  signs: [
    { id: "vikeplikt", code: "202", pos: [HW + 1.5, ENTRY - 1], facing: "S" },
    { id: "rundkjoring", code: "406", pos: [HW + 1.5, ENTRY - 5], facing: "S" },
  ],
  markings: [{ id: "vikelinje", type: "vikelinje", a: [0.2, ENTRY], b: [HW - 0.2, ENTRY], toward: "S" }],
  vehicles: [
    {
      id: "venter-ost",
      type: "personbil",
      name: "Bilen som venter i øst",
      ...ventende,
      color: "#ff8a65",
      route: roundaboutRoute({ at: AT, from: "E", start: RB_OUTER + 4, exit: "N" }),
    },
  ],
  decor: [
    { type: "hus", pos: [20, 6] },
    { type: "tre", pos: [-12, 10] },
    { type: "tre", pos: [-20, 44], size: 1.2 },
  ],
  player: { route: roundaboutRoute({ at: AT, from: "S", start: AT, exit: "N" }) },
  questions: [
    {
      id: "rk-blink-nar",
      type: "choice",
      prompt: "Du skal ta den andre avkjøringen (rett frem). Når bør du blinke til høyre?",
      options: [
        { id: "for-inn", text: "Før du kjører inn i rundkjøringen" },
        { id: "passert", text: "Når du er ved avkjøringen før den du skal ta" },
        { id: "aldri", text: "Du trenger ikke blinke når du skal rett frem" },
        { id: "venstre", text: "Du blinker til venstre hele veien rundt" },
      ],
      correct: "passert",
      explanation:
        "Du skal gi tegn når du skifter retning. Statens vegvesen anbefaler å blinke til høyre når du er ved avkjøringen før den du skal ta, så de som venter, vet at du skal ut.",
      rule: "Trafikkreglene § 14 nr. 2 (veiledning fra Statens vegvesen)",
      highlight: ["venter-ost"],
    },
    {
      id: "rk-blink-ut",
      type: "yesno",
      prompt: "Skal du gi tegn med høyre blinklys før du kjører ut av rundkjøringen?",
      correct: true,
      explanation:
        "Når du kjører ut, svinger du til høyre. Da skal du gi tegn, slik at andre kan forstå hva du skal gjøre.",
      rule: "Trafikkreglene § 14 nr. 2",
      highlight: [],
    },
  ],
};
