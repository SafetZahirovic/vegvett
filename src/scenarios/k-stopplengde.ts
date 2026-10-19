import { knowledge } from "./kunnskap";

/** Reaksjonslengde, bremselengde og stopplengde. */
export const kStopplengde = knowledge({
  id: "k-stopplengde",
  title: "Stopplengde",
  topic: "fart",
  difficulty: 2,
  questions: [
    {
      id: "ks-definisjon",
      type: "choice",
      prompt: "Hva er stopplengde?",
      options: [
        { id: "sum", text: "Reaksjonslengden pluss bremselengden" },
        { id: "brems", text: "Bare strekningen bilen bremser" },
        { id: "reaksjon", text: "Strekningen du kjører før du reagerer" },
        { id: "fart", text: "Farten delt på ti" },
      ],
      correct: "sum",
      explanation:
        "Stopplengden er hele strekningen fra du oppdager faren til bilen står: reaksjonslengden (før du begynner å bremse) pluss bremselengden.",
      rule: "Statens vegvesens temaliste: stopplengde, bremselengde, reaksjonslengde",
      highlight: [],
    },
    {
      id: "ks-dobbel",
      type: "choice",
      prompt: "Du dobler farten. Hva skjer omtrent med bremselengden?",
      options: [
        { id: "x4", text: "Den blir omtrent fire ganger så lang" },
        { id: "x2", text: "Den blir dobbelt så lang" },
        { id: "lik", text: "Den blir omtrent lik" },
        { id: "x8", text: "Den blir åtte ganger så lang" },
      ],
      correct: "x4",
      explanation: "Bremselengden øker med kvadratet av farten. Dobbel fart gir omtrent fire ganger så lang bremselengde.",
      rule: "Fysikk (bevegelsesenergi øker med farten i andre)",
      highlight: [],
    },
    {
      id: "ks-reaksjonstid",
      type: "choice",
      prompt: "Omtrent hvor lang er en vanlig reaksjonstid for en opplagt fører?",
      options: [
        { id: "1s", text: "Omtrent 1 sekund" },
        { id: "01s", text: "Omtrent 0,1 sekund" },
        { id: "3s", text: "Omtrent 3 sekunder" },
        { id: "5s", text: "Omtrent 5 sekunder" },
      ],
      correct: "1s",
      explanation:
        "En opplagt fører bruker vanligvis rundt ett sekund (ofte 0,8–1,5 s) fra faren oppdages til bremsen tas i bruk. Trøtthet, rus og uoppmerksomhet gjør tiden lengre.",
      rule: "Statens vegvesens temaliste: sanser og reaksjonstid",
      highlight: [],
    },
    {
      id: "ks-glatt",
      type: "yesno",
      prompt: "Blir bremselengden mange ganger lengre på is enn på tørr asfalt?",
      correct: true,
      explanation:
        "Friksjonen på is er mye lavere. Statens vegvesen har vist at stopplengden ved 110 km/t kan gå fra under 100 meter på tørr asfalt til flere hundre meter på svært glatt is.",
      rule: "Statens vegvesens temaliste: vegforhold og veggrep",
      highlight: [],
    },
    {
      id: "ks-abs",
      type: "choice",
      prompt: "Hva gjør ABS-bremser?",
      options: [
        { id: "styre", text: "Hindrer at hjulene låser seg, slik at du kan styre mens du bremser hardt" },
        { id: "kort", text: "Gir alltid kortere bremselengde" },
        { id: "skrens", text: "Fjerner all fare for skrens" },
        { id: "auto", text: "Bremser bilen automatisk" },
      ],
      correct: "styre",
      explanation:
        "ABS hindrer at hjulene låser seg ved hard bremsing, så du kan fortsatt styre. ABS gir ikke alltid kortere bremselengde.",
      rule: "Statens vegvesens temaliste: førerstøttesystemer",
      highlight: [],
    },
  ],
});
