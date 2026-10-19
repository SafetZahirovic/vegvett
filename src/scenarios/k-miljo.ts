import { knowledge } from "./kunnskap";

/** Miljøvennlig kjøring. */
export const kMiljo = knowledge({
  id: "k-miljo",
  title: "Miljøvennlig kjøring",
  topic: "mennesket",
  questions: [
    {
      id: "kmi-tomgang",
      type: "yesno",
      prompt: "Er det lov å la motoren gå på tomgang unødvendig mens du venter?",
      correct: false,
      explanation: "Motoren skal ikke gå på tomgang slik at den gir unødig støy eller eksos.",
      rule: "Trafikkreglene § 16 nr. 1",
      highlight: [],
    },
    {
      id: "kmi-jevn",
      type: "choice",
      prompt: "Hva gir lavest forbruk og minst utslipp?",
      options: [
        { id: "jevn", text: "Jevn kjøring, planlegging og bruk av motorbrems" },
        { id: "brå", text: "Rask akselerasjon og sen, hard bremsing" },
        { id: "lavt", text: "Kjøring i lavt gir hele tiden" },
        { id: "tomgang", text: "La motoren gå mens du venter, så den er varm" },
      ],
      correct: "jevn",
      explanation:
        "Jevn kjøring der du ser langt fram og lar bilen rulle ned i fart, bruker mindre energi enn brå akselerasjon og bremsing.",
      rule: "Statens vegvesens temaliste: miljøhensyn",
      highlight: [],
    },
    {
      id: "kmi-takboks",
      type: "yesno",
      prompt: "Øker en takboks og tung last som ikke trengs, forbruket?",
      correct: true,
      explanation: "Luftmotstand og vekt øker forbruket. Ta av takboksen og fjern unødvendig last når du ikke trenger den.",
      rule: "Statens vegvesens temaliste: miljøhensyn",
      highlight: [],
    },
    {
      id: "kmi-dekktrykk",
      type: "choice",
      prompt: "Hva skjer med forbruket hvis dekktrykket er for lavt?",
      options: [
        { id: "opp", text: "Det øker, og veigrepet blir dårligere" },
        { id: "ned", text: "Det går ned" },
        { id: "lik", text: "Ingenting" },
        { id: "bare-vinter", text: "Det har bare betydning om vinteren" },
      ],
      correct: "opp",
      explanation: "For lavt dekktrykk gir mer rullemotstand og dårligere veigrep. Følg bilprodusentens anbefaling.",
      rule: "Statens vegvesens temaliste: miljøhensyn",
      highlight: [],
    },
  ],
});
