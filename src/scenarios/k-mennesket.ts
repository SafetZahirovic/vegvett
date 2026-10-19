import { knowledge } from "./kunnskap";

/** Trøtthet, rus, medisiner og syn. */
export const kMennesket = knowledge({
  id: "k-mennesket",
  title: "Trøtthet, rus og medisiner",
  topic: "mennesket",
  questions: [
    {
      id: "km-trott",
      type: "choice",
      prompt: "Du merker at du gjesper og ikke husker de siste kilometerne. Hva gjør du?",
      options: [
        { id: "sov", text: "Stanser på et trygt sted og sover en kort stund" },
        { id: "vindu", text: "Åpner vinduet og skrur opp musikken" },
        { id: "kaffe", text: "Drikker kaffe mens du kjører videre" },
        { id: "fort", text: "Øker farten for å komme fram før du blir mer trøtt" },
      ],
      correct: "sov",
      explanation:
        "Dette er tegn på at du kan sovne. Åpent vindu, musikk og kaffe løser ikke problemet. Stans på et trygt sted og sov en kort stund (rundt 15 minutter).",
      rule: "Vegtrafikkloven § 21",
      highlight: [],
    },
    {
      id: "km-skikket",
      type: "yesno",
      prompt: "Er det forbudt å kjøre når du er så trøtt at du ikke kan kjøre trygt?",
      correct: true,
      explanation:
        "Du kan ikke kjøre når du ikke er i stand til å kjøre trygt – også om årsaken er trøtthet, sykdom eller legemidler.",
      rule: "Vegtrafikkloven § 21",
      highlight: [],
    },
    {
      id: "km-promille",
      type: "choice",
      prompt: "Fra hvilken promille regnes du alltid som påvirket av alkohol når du kjører bil?",
      options: [
        { id: "0.2", text: "Over 0,2 promille" },
        { id: "0.5", text: "Over 0,5 promille" },
        { id: "0.8", text: "Over 0,8 promille" },
        { id: "0", text: "Bare hvis politiet ser at du er full" },
      ],
      correct: "0.2",
      explanation: "Har du mer enn 0,2 promille alkohol i blodet, regnes du som påvirket.",
      rule: "Vegtrafikkloven § 22",
      highlight: [],
    },
    {
      id: "km-trekant",
      type: "choice",
      prompt: "Legemiddelpakningen har en rød varseltrekant. Hva betyr det?",
      options: [
        { id: "vurder", text: "Legemidlet kan påvirke kjøreevnen – les pakningsvedlegget og snakk med lege" },
        { id: "forbud", text: "Det er alltid forbudt å kjøre" },
        { id: "giftig", text: "Legemidlet er giftig" },
        { id: "ingen", text: "Det har ingen betydning for bilkjøring" },
      ],
      correct: "vurder",
      explanation:
        "Den røde trekanten betyr at legemidlet kan svekke evnen til å kjøre. Det er ikke et totalforbud, men du har selv ansvaret for å være skikket.",
      rule: "Vegtrafikkloven § 21; Legemiddelverkets ordning med varseltrekant",
      highlight: [],
    },
    {
      id: "km-syn",
      type: "choice",
      prompt: "Hvilket synskrav gjelder for førerkort klasse B?",
      options: [
        { id: "0.5", text: "Synsstyrke på minst 0,5 med begge øyne samlet" },
        { id: "1.0", text: "Synsstyrke på minst 1,0 på hvert øye" },
        { id: "ingen", text: "Det finnes ikke noe synskrav" },
        { id: "0.1", text: "Synsstyrke på minst 0,1" },
      ],
      correct: "0.5",
      explanation:
        "For klasse B kreves synsstyrke på minst 0,5 for begge øyne samlet (eller med ett øye), og et tilstrekkelig synsfelt.",
      rule: "Førerkortforskriften vedlegg 1 § 9",
      highlight: [],
    },
    {
      id: "km-fartsblind",
      type: "choice",
      prompt: "Du har kjørt lenge i 110 km/t og kommer av motorvegen. Hva bør du passe på?",
      options: [
        { id: "speedo", text: "At du ikke kjører for fort – sjekk speedometeret, farten føles lavere enn den er" },
        { id: "nei", text: "Ingenting spesielt" },
        { id: "fortere", text: "At du kjører fortere for å holde flyten" },
        { id: "lys", text: "At du skrur på fjernlyset" },
      ],
      correct: "speedo",
      explanation:
        "Etter lang tid i høy fart føles lavere fart saktere enn den er (fartsblindhet). Sjekk speedometeret.",
      rule: "Statens vegvesens temaliste: sanser",
      highlight: [],
    },
  ],
});
