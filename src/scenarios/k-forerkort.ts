import { knowledge } from "./kunnskap";

/** Førerkortklasse B, tilhenger, øvelseskjøring og teoriprøven. */
export const kForerkort = knowledge({
  id: "k-forerkort",
  title: "Førerkort og øvelseskjøring",
  topic: "ansvar",
  licences: ["B"],
  questions: [
    {
      id: "kf-b",
      type: "choice",
      prompt: "Hva er største tillatte totalvekt for en bil du kan kjøre med førerkort klasse B?",
      options: [
        { id: "3500", text: "3 500 kg" },
        { id: "2500", text: "2 500 kg" },
        { id: "4250", text: "4 250 kg" },
        { id: "7500", text: "7 500 kg" },
      ],
      correct: "3500",
      explanation: "Klasse B gjelder bil med tillatt totalvekt på høyst 3 500 kg og høyst 8 passasjerer i tillegg til føreren.",
      rule: "Førerkortforskriften § 3-1",
      highlight: [],
    },
    {
      id: "kf-tilhenger",
      type: "choice",
      prompt: "Hvor tung tilhenger kan du alltid trekke med klasse B (tillatt totalvekt)?",
      options: [
        { id: "750", text: "Høyst 750 kg" },
        { id: "1000", text: "Høyst 1 000 kg" },
        { id: "3500", text: "Høyst 3 500 kg" },
        { id: "ingen", text: "Ingen tilhenger uten BE" },
      ],
      correct: "750",
      explanation:
        "Med B kan tilhengeren veie høyst 750 kg. Er den tyngre, må bil og tilhenger til sammen være høyst 3 500 kg (4 250 kg med kode 96).",
      rule: "Førerkortforskriften § 3-1 og § 3-5",
      highlight: [],
    },
    {
      id: "kf-brems",
      type: "choice",
      prompt: "En tilhenger uten egne bremser kan høyst veie …",
      options: [
        { id: "halv", text: "Halvparten av bilens egenvekt, og aldri over 750 kg" },
        { id: "lik", text: "Like mye som bilen" },
        { id: "1500", text: "1 500 kg" },
        { id: "fri", text: "Det finnes ingen grense" },
      ],
      correct: "halv",
      explanation:
        "Tilhenger uten brems kan høyst veie halvparten av bilens egenvekt, men aldri over 750 kg. Tallene står i vognkortet.",
      rule: "Bilforskriften § 11-1",
      highlight: [],
    },
    {
      id: "kf-ovelse",
      type: "choice",
      prompt: "Hvilket krav stilles til ledsageren ved øvelseskjøring med bil?",
      options: [
        { id: "25-5", text: "Fylt 25 år og hatt førerett i klassen sammenhengende i 5 år" },
        { id: "18-1", text: "Fylt 18 år og hatt førerkort i 1 år" },
        { id: "laerer", text: "Må være trafikklærer" },
        { id: "ingen", text: "Ingen krav, bare de har førerkort" },
      ],
      correct: "25-5",
      explanation: "Ledsageren må ha fylt 25 år og hatt førerett i klassen sammenhengende i 5 år.",
      rule: "Vegtrafikkloven § 26",
      highlight: [],
    },
    {
      id: "kf-alder",
      type: "choice",
      prompt: "Når kan du tidligst øvelseskjøre bil?",
      options: [
        { id: "16", text: "Når du er 16 år" },
        { id: "15", text: "Når du er 15 år" },
        { id: "17", text: "Når du er 17 år" },
        { id: "18", text: "Når du er 18 år" },
      ],
      correct: "16",
      explanation:
        "Øvelseskjøring kan starte to år før aldersgrensen, altså fra 16 år for klasse B. Under 25 år må du ha trafikalt grunnkurs først.",
      rule: "Vegtrafikkloven § 26",
      highlight: [],
    },
    {
      id: "kf-teoriprove",
      type: "choice",
      prompt: "Hvordan er teoriprøven for klasse B?",
      options: [
        { id: "45", text: "45 spørsmål, minst 38 riktige, 90 minutter" },
        { id: "30", text: "30 spørsmål, minst 25 riktige, 60 minutter" },
        { id: "50", text: "50 spørsmål, minst 45 riktige, 120 minutter" },
        { id: "muntlig", text: "Bare en muntlig samtale" },
      ],
      correct: "45",
      explanation:
        "Teoriprøven har 45 spørsmål, og du må ha minst 38 riktige (maks 7 feil). Du har 90 minutter. Stryker du, må du vente to uker før du kan prøve igjen.",
      rule: "Statens vegvesen: gjennomføring av teoriprøven",
      highlight: [],
    },
  ],
});
