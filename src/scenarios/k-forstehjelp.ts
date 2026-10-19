import { HW, LANE } from "../scene/road";
import type { Scenario } from "./types";

/** Trafikkuhell: sikre, varsle, hjelpe. Viser to biler som har kollidert. */
export const kForstehjelp: Scenario = {
  id: "k-forstehjelp",
  title: "Trafikkuhell og førstehjelp",
  topic: "sikkerhet",
  difficulty: 2,
  road: { type: "rett" },
  signs: [],
  markings: [],
  vehicles: [
    { id: "bil-a", type: "personbil", name: "Den ene bilen", pos: [1.2, 26], heading: 30, color: "#ff8a65" },
    { id: "bil-b", type: "personbil", name: "Den andre bilen", pos: [-1.4, 29], heading: 200, color: "#ffd166" },
  ],
  pedestrians: [{ id: "skadet", name: "Den skadde", pos: [HW + 1.2, 28], heading: "W" }],
  decor: [
    { type: "tre", pos: [-10, 14] },
    { type: "tre", pos: [12, 38] },
  ],
  player: {
    indicator: "right",
    route: {
      turn: "pullover",
      points: [
        [LANE / 2, 0],
        [LANE / 2, 4],
        [2.7, 10],
        [2.7, 14],
      ],
    },
  },
  questions: [
    {
      id: "kf-rekkefolge",
      type: "choice",
      prompt: "Du kommer først til en ulykke. Hva er riktig rekkefølge?",
      options: [
        { id: "svh", text: "Sikre skadestedet, varsle og gi førstehjelp" },
        { id: "hjelp", text: "Gi førstehjelp, så sikre, så varsle" },
        { id: "bilde", text: "Ta bilder til forsikringen først" },
        { id: "kjor", text: "Kjøre videre og ringe fra neste rasteplass" },
      ],
      correct: "svh",
      explanation:
        "Sikre stedet (nødsignallys, refleksvest, varseltrekant) så ingen flere blir skadet, varsle nødetatene og gi livreddende førstehjelp.",
      rule: "Vegtrafikkloven § 12; bruksforskriften § 1-6",
      highlight: ["bil-a", "bil-b", "skadet"],
    },
    {
      id: "kf-113",
      type: "choice",
      prompt: "Hvilket nummer ringer du for ambulanse?",
      options: [
        { id: "113", text: "113" },
        { id: "112", text: "112" },
        { id: "110", text: "110" },
        { id: "1881", text: "1881" },
      ],
      correct: "113",
      explanation: "113 er medisinsk nødtelefon (ambulanse). 112 er politi og 110 er brann.",
      rule: "Nasjonale nødnumre",
      highlight: [],
    },
    {
      id: "kf-plikt",
      type: "yesno",
      prompt: "Har du som er innblandet i en ulykke plikt til å stanse og hjelpe skadde?",
      correct: true,
      explanation:
        "Den som er innblandet i en trafikkulykke, skal straks stanse og hjelpe skadde. Ved død eller ikke ubetydelig personskade skal politiet varsles snarest.",
      rule: "Vegtrafikkloven § 12",
      highlight: [],
    },
    {
      id: "kf-puster",
      type: "choice",
      prompt: "Den skadde er bevisstløs, men puster normalt. Hva gjør du?",
      options: [
        { id: "side", text: "Legger personen i stabilt sideleie og følger med på pusten" },
        { id: "hlr", text: "Starter hjerte-lunge-redning" },
        { id: "vann", text: "Gir personen noe å drikke" },
        { id: "rygg", text: "Legger personen på ryggen uten tilsyn" },
      ],
      correct: "side",
      explanation:
        "Stabilt sideleie holder luftveiene åpne. Følg med på pusten, og start hjerte-lunge-redning hvis personen slutter å puste normalt.",
      rule: "Norsk resuscitasjonsråd (førstehjelp)",
      highlight: ["skadet"],
    },
    {
      id: "kf-hlr",
      type: "choice",
      prompt: "Den skadde puster ikke normalt. Hvordan gir du hjerte-lunge-redning til en voksen?",
      options: [
        { id: "30-2", text: "30 brystkompresjoner og 2 innblåsninger, om igjen" },
        { id: "15-1", text: "15 kompresjoner og 1 innblåsning" },
        { id: "5-5", text: "5 innblåsninger og 5 kompresjoner" },
        { id: "bare", text: "Bare innblåsninger" },
      ],
      correct: "30-2",
      explanation:
        "Ring 113 og start HLR: 30 kompresjoner midt på brystet (5–6 cm dypt, 100–120 i minuttet) og 2 innblåsninger. Bruk hjertestarter hvis den finnes.",
      rule: "Norsk resuscitasjonsråd (førstehjelp)",
      highlight: [],
    },
  ],
};
