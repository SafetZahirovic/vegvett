import { knowledge } from "./kunnskap";

/** Prikker, promille-reaksjoner, forsikring og hva som gjelder foran hva. */
export const kAnsvar = knowledge({
  id: "k-ansvar",
  title: "Lover og ansvar",
  topic: "ansvar",
  difficulty: 2,
  questions: [
    {
      id: "ka-prikker",
      type: "choice",
      prompt: "Hvor mange prikker innen tre år gir tap av føreretten?",
      options: [
        { id: "8", text: "8 prikker" },
        { id: "5", text: "5 prikker" },
        { id: "12", text: "12 prikker" },
        { id: "3", text: "3 prikker" },
      ],
      correct: "8",
      explanation: "Får du 8 prikker i løpet av 3 år, mister du føreretten i 6 måneder.",
      rule: "Forskrift om prikkbelastning § 4",
      highlight: [],
    },
    {
      id: "ka-provetid",
      type: "choice",
      prompt: "Du har hatt førerkort i ett år. Hva skjer med prikkene hvis du bryter en regel?",
      options: [
        { id: "dobbel", text: "Du får dobbelt antall prikker, fordi du er i prøveperioden" },
        { id: "halv", text: "Du får halvparten, fordi du er ny" },
        { id: "ingen", text: "Nye førere får ikke prikker" },
        { id: "samme", text: "Det samme som alle andre" },
      ],
      correct: "dobbel",
      explanation: "De første to årene er prøveperiode. Da gir brudd dobbelt antall prikker.",
      rule: "Forskrift om prikkbelastning § 3; førerkortforskriften § 4-2",
      highlight: [],
    },
    {
      id: "ka-mobil",
      type: "yesno",
      prompt: "Står du i kø, er det lov å bruke håndholdt mobil så lenge bilen står helt stille?",
      correct: false,
      explanation:
        "Føreren må ikke bruke håndholdt mobil under kjøring, og Høyesterett har slått fast at det gjelder også i kø og på rødt lys. Håndfri løsning eller fast holder er tillatt for samtaler.",
      rule: "Forskrift om forbud mot bruk av mobiltelefon under kjøring § 2",
      highlight: [],
    },
    {
      id: "ka-forsikring",
      type: "yesno",
      prompt: "Er det påbudt å ha trafikkforsikring på en registrert bil?",
      correct: true,
      explanation:
        "Eieren må ha trafikkforsikring. Den dekker skader på andre, også når ingen har skyld, men ikke skade på din egen bil.",
      rule: "Bilansvarslova §§ 4, 5 og 15",
      highlight: [],
    },
    {
      id: "ka-politi",
      type: "choice",
      prompt: "Lyset viser rødt, men en politibetjent vinker deg fram. Hva gjør du?",
      options: [
        { id: "politi", text: "Følger politiets anvisning" },
        { id: "lys", text: "Venter på grønt lys" },
        { id: "skilt", text: "Følger skiltene" },
        { id: "hoyre", text: "Følger høyreregelen" },
      ],
      correct: "politi",
      explanation:
        "Anvisning fra politiet går foran lyssignal, skilt og trafikkregler. Lyssignal går foran skilt, og skilt går foran de vanlige reglene.",
      rule: "Trafikkreglene § 3",
      highlight: [],
    },
    {
      id: "ka-drikke",
      type: "yesno",
      prompt: "Du har vært innblandet i en ulykke og forstår at det kan bli etterforsket. Kan du drikke alkohol rett etterpå?",
      correct: false,
      explanation:
        "Du må ikke drikke alkohol de første 6 timene etter kjøringen når du forstår at det kan bli etterforskning.",
      rule: "Vegtrafikkloven § 22 femte ledd",
      highlight: [],
    },
    {
      id: "ka-promille-provetid",
      type: "yesno",
      prompt: "Du er i prøveperioden og tas med 0,3 promille. Kan du miste føreretten?",
      correct: true,
      explanation:
        "Mellom 0,2 og 0,5 promille mister du normalt ikke føreretten, men i prøveperioden skal du miste den.",
      rule: "Vegtrafikkloven § 33 nr. 1; tapsforskriften § 3-1",
      highlight: [],
    },
  ],
});
