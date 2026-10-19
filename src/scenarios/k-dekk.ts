import { knowledge } from "./kunnskap";

/** Dekk: mønsterdybde, vinterperiode og piggdekk. */
export const kDekk = knowledge({
  id: "k-dekk",
  title: "Dekk og årstider",
  topic: "kjoretoy",
  questions: [
    {
      id: "kd-sommer",
      type: "choice",
      prompt: "Hva er minste lovlige mønsterdybde på sommerdekk på personbil?",
      options: [
        { id: "1.6", text: "1,6 mm" },
        { id: "3", text: "3 mm" },
        { id: "1", text: "1 mm" },
        { id: "5", text: "5 mm" },
      ],
      correct: "1.6",
      explanation: "Om sommeren er kravet minst 1,6 mm mønsterdybde for kjøretøy opp til 3 500 kg.",
      rule: "Bruksforskriften § 1-4 nr. 2",
      highlight: [],
    },
    {
      id: "kd-vinter",
      type: "choice",
      prompt: "Hva er minste mønsterdybde om vinteren for personbil?",
      options: [
        { id: "3", text: "3 mm" },
        { id: "1.6", text: "1,6 mm" },
        { id: "5", text: "5 mm" },
        { id: "4", text: "4 mm" },
      ],
      correct: "3",
      explanation: "I vinterperioden er kravet minst 3 mm for kjøretøy opp til 3 500 kg.",
      rule: "Bruksforskriften § 1-4 nr. 2",
      highlight: [],
    },
    {
      id: "kd-vinterperiode",
      type: "choice",
      prompt: "Når gjelder vinterkravet til mønsterdybde (utenom Nord-Norge)?",
      options: [
        { id: "nov", text: "Fra 1. november til første søndag etter 2. påskedag" },
        { id: "okt", text: "Fra 1. oktober til 1. mai" },
        { id: "des", text: "Fra 1. desember til 1. mars" },
        { id: "sno", text: "Bare når det ligger snø på vegen" },
      ],
      correct: "nov",
      explanation:
        "Vinterkravet gjelder fra 1. november til første søndag etter 2. påskedag. I Nordland, Troms og Finnmark gjelder sommerkravet bare fra 1. mai til 15. oktober.",
      rule: "Bruksforskriften § 1-4 nr. 2",
      highlight: [],
    },
    {
      id: "kd-pigg",
      type: "yesno",
      prompt: "Kan du kjøre med piggdekk i juli i Sør-Norge når det er tørt og fint?",
      correct: false,
      explanation:
        "Piggdekk er ikke tillatt fra første mandag etter 2. påskedag til og med 31. oktober, med mindre føret gjør det nødvendig.",
      rule: "Bruksforskriften § 1-4 nr. 4",
      highlight: [],
    },
    {
      id: "kd-dato",
      type: "yesno",
      prompt: "Finnes det en fast dato da alle personbiler må ha vinterdekk?",
      correct: false,
      explanation:
        "Fast vinterdekkplikt med datoer gjelder kjøretøy over 3 500 kg. For personbil er det ingen dato, men dekkene må alltid passe for føret.",
      rule: "Bruksforskriften § 1-4 nr. 3",
      highlight: [],
    },
  ],
});
