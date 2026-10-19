import { knowledge } from "./kunnskap";

/** Feltskifte, glidelås, motorveg-påkjøring og rygging. */
export const kFlettingRygging = knowledge({
  id: "k-fletting-rygging",
  title: "Feltskifte, fletting og rygging",
  topic: "vikeplikt",
  difficulty: 2,
  questions: [
    {
      id: "kfr-feltskifte",
      type: "yesno",
      prompt: "Har du vikeplikt for trafikken i feltet du skal skifte inn i?",
      correct: true,
      explanation: "Den som skifter felt, har vikeplikt for trafikk i feltet han skal inn i.",
      rule: "Trafikkreglene § 8 nr. 1",
      highlight: [],
    },
    {
      id: "kfr-glidelas",
      type: "choice",
      prompt: "To felt blir til ett, og trafikken går sakte. Hvordan skal bilene flette?",
      options: [
        { id: "glidelas", text: "Vekselvis, én fra hvert felt – glidelåsprinsippet" },
        { id: "hoyre", text: "Feltet til høyre har alltid forkjørsrett" },
        { id: "forst", text: "Den som kommer først, kjører først" },
        { id: "venstre", text: "Feltet til venstre har alltid forkjørsrett" },
      ],
      correct: "glidelas",
      explanation:
        "Når antall felt blir færre, faller vikeplikten ved feltskifte bort. Bilene skal tilpasse farten og kjøre vekselvis.",
      rule: "Trafikkreglene § 8 nr. 1 tredje ledd",
      highlight: [],
    },
    {
      id: "kfr-akselerasjon",
      type: "choice",
      prompt: "Du kjører inn på motorvegen fra akselerasjonsfeltet. Hva gjør du?",
      options: [
        { id: "tilpass", text: "Tilpasser farten til trafikken i feltet du skal inn i" },
        { id: "stans", text: "Stanser i enden av akselerasjonsfeltet og venter" },
        { id: "forkjor", text: "Kjører rett inn – de på motorvegen må vike" },
        { id: "sakte", text: "Kjører sakte inn så de ser deg" },
      ],
      correct: "tilpass",
      explanation:
        "Bruk akselerasjonsfeltet til å komme opp i samme fart som trafikken. De som allerede er på vegen, skal gjøre det lettere for deg å komme inn.",
      rule: "Trafikkreglene § 8 nr. 2",
      highlight: [],
    },
    {
      id: "kfr-rygge",
      type: "choice",
      prompt: "Du skal rygge ut fra en innkjørsel. Hvem har vikeplikt?",
      options: [
        { id: "du", text: "Du har vikeplikt for alle andre" },
        { id: "hoyre", text: "Høyreregelen gjelder" },
        { id: "andre", text: "De andre må vente på deg" },
        { id: "gaende", text: "Bare gående har vikeplikt" },
      ],
      correct: "du",
      explanation:
        "Den som rygger eller vender, har vikeplikt for alle andre. Har du dårlig utsikt, må du sjekke selv eller ha noen som hjelper deg.",
      rule: "Trafikkreglene § 11 nr. 1",
      highlight: [],
    },
    {
      id: "kfr-motorveg",
      type: "yesno",
      prompt: "Har du kjørt forbi avkjøringen på motorvegen, kan du rygge tilbake i vegskulderen?",
      correct: false,
      explanation: "Rygging og vending er forbudt på motorveg og motortrafikkveg, og på inn- og utkjøringene.",
      rule: "Trafikkreglene § 11 nr. 2",
      highlight: [],
    },
  ],
});
