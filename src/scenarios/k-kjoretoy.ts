import { knowledge } from "./kunnskap";

/** Vognkort, vekter, varsellamper og periodisk kontroll. */
export const kKjoretoy = knowledge({
  id: "k-kjoretoy",
  title: "Vognkort, vekt og varsellamper",
  topic: "kjoretoy",
  difficulty: 2,
  licences: ["B"],
  questions: [
    {
      id: "kk-vognkort",
      type: "choice",
      prompt: "Hvor finner du bilens tillatte totalvekt og hvor tung tilhenger den kan trekke?",
      options: [
        { id: "vognkort", text: "I vognkortet" },
        { id: "forerkort", text: "I førerkortet" },
        { id: "forsikring", text: "I forsikringsbeviset" },
        { id: "skilt", text: "På kjennemerket" },
      ],
      correct: "vognkort",
      explanation:
        "Vognkortet viser blant annet egenvekt, tillatt totalvekt og tillatt tilhengervekt med og uten brems. Bilen må ikke lastes eller brukes ut over dette.",
      rule: "Bruksforskriften § 5-1 (vognkortet)",
      highlight: [],
    },
    {
      id: "kk-nyttelast",
      type: "choice",
      prompt: "Hva er bilens nyttelast?",
      options: [
        { id: "diff", text: "Hvor mye du kan laste, ut fra tillatt totalvekt og egenvekt" },
        { id: "egen", text: "Vekten av bilen uten last" },
        { id: "total", text: "Den samme som tillatt totalvekt" },
        { id: "tak", text: "Hvor mye du kan ha på taket" },
      ],
      correct: "diff",
      explanation:
        "Nyttelasten er hvor mye du kan laste i bilen, inkludert passasjerer. Den er tillatt totalvekt minus egenvekt og 75 kg for føreren. På nyere vognkort er føreren ofte regnet med i egenvekten.",
      rule: "Kjøretøyforskriften § 2-6",
      highlight: [],
    },
    {
      id: "kk-bla-lampe",
      type: "choice",
      prompt: "En blå kontrollampe lyser i instrumentpanelet. Hva betyr det vanligvis?",
      options: [
        { id: "fjern", text: "Fjernlyset er på" },
        { id: "feil", text: "Alvorlig feil – stans straks" },
        { id: "kald", text: "Motoren er for kald" },
        { id: "lys", text: "Lyset er slått av" },
      ],
      correct: "fjern",
      explanation:
        "Blå kontrollampe viser at fjernlyset er på. Grønne lamper viser andre funksjoner som er på, gule varsler en feil som må sjekkes, og røde varsler en alvorlig feil.",
      rule: "Fargekoden for varsellamper (ISO-standard, bilens instruksjonsbok)",
      highlight: [],
    },
    {
      id: "kk-gul-lampe",
      type: "choice",
      prompt: "En gul eller oransje varsellampe tennes. Hva gjør du?",
      options: [
        { id: "sjekk", text: "Kjører forsiktig og får sjekket feilen snart" },
        { id: "ignorer", text: "Ingenting – gule lamper er bare informasjon" },
        { id: "stans", text: "Stanser midt i vegen med en gang" },
        { id: "slukk", text: "Slår av og på tenningen til lampen slukker" },
      ],
      correct: "sjekk",
      explanation:
        "Gul eller oransje lampe betyr som regel en feil som ikke er akutt, men som må sjekkes snart. Les i instruksjonsboka hva lampen betyr.",
      rule: "Fargekoden for varsellamper (ISO-standard, bilens instruksjonsbok)",
      highlight: [],
    },
    {
      id: "kk-eu-kontroll",
      type: "choice",
      prompt: "Når skal en ny personbil til første EU-kontroll (periodisk kontroll)?",
      options: [
        { id: "4", text: "Innen fire år etter første registrering, deretter hvert annet år" },
        { id: "1", text: "Hvert år fra første registrering" },
        { id: "10", text: "Først når bilen er ti år" },
        { id: "aldri", text: "Bare når bilen selges" },
      ],
      correct: "4",
      explanation: "Personbiler skal til første periodiske kontroll innen fire år etter første registrering, og deretter hvert annet år.",
      rule: "Forskrift om periodisk kontroll av kjøretøy § 5 annet ledd",
      highlight: [],
    },
    {
      id: "kk-forsvarlig",
      type: "yesno",
      prompt: "Er det føreren som har ansvaret for at bilen er i forsvarlig stand når den kjøres?",
      correct: true,
      explanation: "Føreren skal sørge for at kjøretøyet er i forsvarlig stand, også om det er noen andre som eier bilen.",
      rule: "Vegtrafikkloven § 23 første ledd",
      highlight: [],
    },
  ],
});
