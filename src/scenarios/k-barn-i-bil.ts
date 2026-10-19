import { knowledge } from "./kunnskap";

/** Barn i bil og bilbelte. */
export const kBarnIBil = knowledge({
  id: "k-barn-i-bil",
  title: "Barn i bil",
  topic: "sikkerhet",
  licences: ["B"],
  questions: [
    {
      id: "kb-135",
      type: "choice",
      prompt: "Hvilke barn skal alltid bruke godkjent sikringsutstyr tilpasset vekt og høyde?",
      options: [
        { id: "135", text: "Barn under 135 cm" },
        { id: "100", text: "Barn under 100 cm" },
        { id: "6ar", text: "Bare barn under 6 år" },
        { id: "foran", text: "Bare barn som sitter foran" },
      ],
      correct: "135",
      explanation:
        "Barn under 135 cm skal alltid sikres med godkjent utstyr tilpasset vekt og høyde. Barn mellom 135 og 150 cm skal bruke slikt utstyr hvis det finnes i bilen.",
      rule: "Forskrift om verneutstyr (sikring av barn), Statens vegvesen",
      highlight: [],
    },
    {
      id: "kb-airbag",
      type: "yesno",
      prompt: "Kan du sette et bakovervendt barnesete foran en aktiv airbag?",
      correct: false,
      explanation: "Det er forbudt å plassere bakovervendt barnesete foran en aktiv airbag. Kollisjonsputa må kobles ut.",
      rule: "Forskrift om verneutstyr, Statens vegvesen",
      highlight: [],
    },
    {
      id: "kb-ansvar",
      type: "choice",
      prompt: "Hvem har ansvaret for at en passasjer på 12 år er sikret?",
      options: [
        { id: "forer", text: "Føreren" },
        { id: "barnet", text: "Barnet selv" },
        { id: "eier", text: "Den som eier bilen" },
        { id: "ingen", text: "Ingen, det er frivillig" },
      ],
      correct: "forer",
      explanation: "Føreren har ansvaret for at passasjerer under 15 år er sikret.",
      rule: "Forskrift om verneutstyr",
      highlight: [],
    },
    {
      id: "kb-bakovervendt",
      type: "choice",
      prompt: "Hvor lenge anbefaler Trygg Trafikk at barn sitter bakovervendt?",
      options: [
        { id: "4", text: "Til barnet er minst 4 år" },
        { id: "1", text: "Til barnet er 1 år" },
        { id: "6mnd", text: "Til barnet er 6 måneder" },
        { id: "10", text: "Til barnet er 10 år" },
      ],
      correct: "4",
      explanation: "Barn er best beskyttet bakovervendt, og det anbefales til barnet er minst 4 år.",
      rule: "Trygg Trafikk (anbefaling)",
      highlight: [],
    },
  ],
});
