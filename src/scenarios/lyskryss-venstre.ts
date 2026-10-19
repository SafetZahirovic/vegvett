import { HW } from "../scene/road";
import { junctionRoute, junctionStart } from "./routes";
import type { Scenario } from "./types";

const AT = 26;
const STOP = AT - HW - 4.5;

/** Lyskryss: venstresving på grønt med møtende trafikk. */
export const lyskryssVenstre: Scenario = {
  id: "lyskryss-venstre",
  title: "Venstre på grønt i lyskryss",
  topic: "vikeplikt",
  difficulty: 2,
  road: { type: "x-kryss", at: AT },
  signs: [],
  lights: [
    { id: "lys", pos: [HW + 1.2, STOP + 0.5], facing: "S", state: "gronn" },
    { id: "lys-mot", pos: [-HW - 1.2, AT + HW + 4.5 - 0.5], facing: "N", state: "gronn" },
  ],
  markings: [
    { id: "stopplinje", type: "stopplinje", a: [0.15, STOP], b: [HW - 0.25, STOP] },
    { id: "stopplinje-mot", type: "stopplinje", a: [-0.15, AT + HW + 4.5], b: [-HW + 0.25, AT + HW + 4.5] },
  ],
  vehicles: [
    {
      id: "motende",
      type: "personbil",
      name: "Den møtende bilen",
      ...junctionStart("N", AT, HW + 9),
      color: "#ffd166",
      route: junctionRoute({ from: "N", turn: "straight", at: AT, start: HW + 9 }),
    },
  ],
  decor: [
    { type: "hus", pos: [-15, 12] },
    { type: "tre", pos: [13, 12] },
    { type: "hus", pos: [15, 42] },
  ],
  player: { indicator: "left", route: junctionRoute({ from: "S", turn: "left", at: AT, start: AT }) },
  view: { focus: [0, 22] },
  questions: [
    {
      id: "lkv-motende",
      type: "yesno",
      prompt: "Du har grønt og skal til venstre. Kan du svinge foran den møtende bilen, som også har grønt?",
      correct: false,
      explanation:
        "Grønt lys gir ikke forkjørsrett. Når du svinger til venstre, har du vikeplikt for møtende trafikk. Vent midt i krysset til det er klart.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["motende"],
    },
    {
      id: "lkv-rekkefolge",
      type: "order",
      prompt: "Klikk kjøretøyene i den rekkefølgen de skal kjøre.",
      correct: ["motende", "player"],
      explanation: "Den møtende bilen kjører rett fram. Du skal til venstre og har vikeplikt for den, så du kjører sist.",
      rule: "Trafikkreglene § 7 nr. 2",
      highlight: ["motende"],
    },
    {
      id: "lkv-pil",
      type: "choice",
      prompt: "Hvilken retning gjelder en grønn pil i et lyssignal for?",
      options: [
        { id: "pil", text: "Bare retningen pilen viser" },
        { id: "alle", text: "Alle retninger" },
        { id: "busser", text: "Bare busser og drosjer" },
        { id: "sykkel", text: "Bare syklende" },
      ],
      correct: "pil",
      explanation: "Et signal med pil gjelder bare for trafikk i den retningen pilen viser.",
      rule: "Skiltforskriften § 24 (signal 1082)",
      highlight: ["lys"],
    },
    {
      id: "lkv-gult",
      type: "choice",
      prompt: "Du står midt i krysset og venter på å svinge. Lyset blir gult. Hva gjør du?",
      options: [
        { id: "fullfor", text: "Fullfører svingen når møtende har stanset, og rydder krysset" },
        { id: "rygg", text: "Rygger tilbake til stopplinjen" },
        { id: "bli", text: "Blir stående til neste grønne lys" },
        { id: "fort", text: "Svinger med en gang, før møtende stanser" },
      ],
      correct: "fullfor",
      explanation:
        "Du har allerede passert signalet og skal kjøre ut av krysset. Du har fortsatt vikeplikt for møtende, så vent til de har stanset, og fullfør svingen.",
      rule: "Trafikkreglene § 7 nr. 2 og skiltforskriften § 24 (signal 1080)",
      highlight: ["motende"],
    },
  ],
};
