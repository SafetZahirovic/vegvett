import { knowledge } from "./kunnskap";

/** Syn, synlighet i mørket og trøtthet. */
export const kSyn = knowledge({
  id: "k-syn",
  title: "Syn, mørke og mikrosøvn",
  topic: "mennesket",
  difficulty: 2,
  questions: [
    {
      id: "ks-kode01",
      type: "yesno",
      prompt: "Førerkortet ditt har kode 01. Må du bruke briller eller linser når du kjører?",
      correct: true,
      explanation: "Kode 01 på førerkortet betyr at du må bruke briller eller kontaktlinser når du kjører.",
      rule: "Førerkortforskriften vedlegg 4 (førerkortkoder)",
      highlight: [],
    },
    {
      id: "ks-refleks",
      type: "choice",
      prompt: "Du kjører med nærlys i mørket. Hvem ser du tidligst?",
      options: [
        { id: "refleks", text: "En fotgjenger med refleks" },
        { id: "mork", text: "En fotgjenger i mørke klær" },
        { id: "lys", text: "En fotgjenger i lyse klær uten refleks" },
        { id: "likt", text: "Alle ses like tidlig" },
      ],
      correct: "refleks",
      explanation:
        "Med nærlys ser du en fotgjenger med refleks mange ganger tidligere enn en i mørke klær uten refleks. Lyse klær hjelper litt, men langt mindre enn refleks.",
      rule: "Statens vegvesen og Trygg Trafikk (refleks og synbarhet)",
      highlight: [],
    },
    {
      id: "ks-blending",
      type: "choice",
      prompt: "Du blendes av en møtende bil i mørket. Hva gjør du?",
      options: [
        { id: "hoyre", text: "Ser mot høyre vegkant og senker farten" },
        { id: "lys", text: "Ser rett inn i lysene og blinker med fjernlyset" },
        { id: "gass", text: "Øker farten for å komme forbi fortere" },
        { id: "lukk", text: "Lukker øynene et øyeblikk" },
      ],
      correct: "hoyre",
      explanation:
        "Ser du mot høyre vegkant, blir du mindre blendet og holder kursen. Senk farten, for du ser kortere når du er blendet.",
      rule: "Trafikkreglene § 13 nr. 1 (råd fra Statens vegvesen)",
      highlight: [],
    },
    {
      id: "ks-mikrosovn",
      type: "choice",
      prompt: "Hva er mikrosøvn?",
      options: [
        { id: "sekunder", text: "Du sovner noen sekunder uten selv å merke det" },
        { id: "blund", text: "En kort, trygg hvil mens du kjører" },
        { id: "natt", text: "Søvn som bare skjer om natta" },
        { id: "gjesp", text: "Det samme som å gjespe" },
      ],
      correct: "sekunder",
      explanation:
        "Ved mikrosøvn sovner du i noen sekunder uten å merke det. I 80 km/t kjører bilen over 20 meter i sekundet uten at noen styrer.",
      rule: "Statens vegvesen (trøtthet bak rattet) og vegtrafikkloven § 21",
      highlight: [],
    },
    {
      id: "ks-vindu",
      type: "yesno",
      prompt: "Hjelper det mot trøtthet å åpne vinduet og skru opp musikken, så du kan kjøre videre lenge?",
      correct: false,
      explanation:
        "Kald luft og musikk hjelper bare noen få minutter. Det som virker, er å stanse på et trygt sted og sove litt.",
      rule: "Statens vegvesen (trøtthet bak rattet) og vegtrafikkloven § 21",
      highlight: [],
    },
    {
      id: "ks-synsfelt",
      type: "choice",
      prompt: "Hva skjer med det du legger merke til til sidene når farten øker?",
      options: [
        { id: "smalere", text: "Du legger merke til mindre til sidene – synsfeltet blir smalere" },
        { id: "bredere", text: "Du ser mer til sidene" },
        { id: "likt", text: "Ingenting endrer seg" },
        { id: "bedre", text: "Du ser bedre fordi du konsentrerer deg mer" },
      ],
      correct: "smalere",
      explanation:
        "Jo høyere fart, jo mer stirrer du rett fram, og du får med deg mindre av det som skjer til sidene. Det gjør det vanskeligere å oppdage f.eks. barn og syklister.",
      rule: "Statens vegvesen (føreren og farten)",
      highlight: [],
    },
  ],
});
