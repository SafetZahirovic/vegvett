import { knowledge } from "./kunnskap";

/** Varsellamper, førerstøttesystemer, sikkerhetskontroll og last. */
export const kTeknikk = knowledge({
  id: "k-teknikk",
  title: "Bilen og teknikken",
  topic: "kjoretoy",
  difficulty: 2,
  questions: [
    {
      id: "kt-rod",
      type: "choice",
      prompt: "En rød varsellampe lyser i instrumentpanelet mens du kjører. Hva gjør du?",
      options: [
        { id: "stans", text: "Stanser så snart det er trygt og undersøker – følg instruksjonsboka" },
        { id: "fortsett", text: "Kjører videre og sjekker det neste gang bilen er på verksted" },
        { id: "ignorer", text: "Ingenting, røde lamper er bare informasjon" },
        { id: "gass", text: "Gir gass for å komme raskt hjem" },
      ],
      correct: "stans",
      explanation:
        "Rød varsellampe betyr vanligvis en alvorlig feil, for eksempel oljetrykk eller bremser. Stans når det er trygt og sjekk i instruksjonsboka. Gul lampe betyr at noe bør sjekkes snart.",
      rule: "Fargekoden for varsellamper (ISO-standard, bilens instruksjonsbok)",
      highlight: [],
    },
    {
      id: "kt-ansvar",
      type: "yesno",
      prompt: "Bilen har nødbremsassistent og adaptiv cruisekontroll. Har du fortsatt ansvaret for kjøringen?",
      correct: true,
      explanation:
        "Førerstøttesystemer hjelper deg, men erstatter deg ikke. Du har alltid ansvaret, og systemene kan svikte for eksempel i snø eller når sensorer er skitne.",
      rule: "Vegtrafikkloven § 3 og § 21",
      highlight: [],
    },
    {
      id: "kt-kontroll",
      type: "choice",
      prompt: "Hva bør du sjekke før du kjører en vinterdag?",
      options: [
        { id: "alt", text: "At rutene er isfrie, lysene virker og det ikke ligger snø på taket" },
        { id: "radio", text: "At radioen virker" },
        { id: "tank", text: "Bare at tanken er full" },
        { id: "ingenting", text: "Ingenting, bilen sier fra om feil" },
      ],
      correct: "alt",
      explanation:
        "Du må ha god sikt og være synlig. Snø fra taket kan skli ned på frontruta eller treffe andre. Sjekk også dekk og væsker jevnlig.",
      rule: "Statens vegvesens temaliste: sikkerhetskontroll",
      highlight: [],
    },
    {
      id: "kt-last",
      type: "choice",
      prompt: "Lasten stikker mer enn 1 meter ut bak bilen. Hva krever reglene?",
      options: [
        { id: "merk", text: "Den skal merkes ytterst, og i mørke også med lykt" },
        { id: "ingen", text: "Ingenting, så lenge den er godt festet" },
        { id: "forbudt", text: "Det er alltid forbudt" },
        { id: "blink", text: "Du må kjøre med nødsignallys" },
      ],
      correct: "merk",
      explanation: "Last som stikker mer enn 1 meter ut bak, skal merkes ytterst – i mørke eller dårlig sikt også med lykt.",
      rule: "Bruksforskriften § 3-4 nr. 3",
      highlight: [],
    },
    {
      id: "kt-sikring",
      type: "yesno",
      prompt: "Skal last i og på bilen sikres så den ikke kan flytte seg ved bremsing eller i svinger?",
      correct: true,
      explanation: "Gods skal sikres slik at det bare kan flytte seg minimalt.",
      rule: "Bruksforskriften § 3-3",
      highlight: [],
    },
  ],
});
