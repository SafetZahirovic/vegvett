import type { Article } from "../types";

const VTL = "https://lovdata.no/dokument/NL/lov/1965-06-18-4";

export const trotthetRus: Article = {
  id: "trotthet-rus",
  title: "Trøtthet, rus og medisiner",
  group: "Mennesket i trafikken",
  order: 1,
  topics: ["mennesket"],
  intro: "Du skal bare kjøre når du er i stand til å kjøre trygt.",
  sections: [
    {
      heading: "Trøtthet",
      text: "Gjesping, tunge øyelokk og at du ikke husker de siste kilometerne er tegn på at du kan sovne. Mikrosøvn varer noen sekunder – lenge nok til å kjøre av vegen. Stans på et trygt sted og sov en kort stund. Åpent vindu, musikk og kaffe hjelper ikke.",
    },
    {
      heading: "Alkohol",
      bullets: [
        "Over 0,2 promille i blodet regnes du som påvirket.",
        "Straffen øker med promillen, og i prøveperioden mister du føreretten selv under 0,5.",
        "Etter kjøring der det kan bli etterforskning, må du ikke drikke de første 6 timene.",
      ],
    },
    {
      heading: "Medisiner",
      text: "Rød varseltrekant på pakningen betyr at legemidlet kan svekke kjøreevnen. Les pakningsvedlegget og spør legen. Du har alltid selv ansvaret for å være skikket – også med legemidler uten trekant.",
    },
    {
      heading: "Syn",
      text: "For klasse B kreves synsstyrke på minst 0,5 med begge øyne samlet, og et godt synsfelt. Etter lang tid i høy fart føles lav fart saktere enn den er – sjekk speedometeret.",
    },
  ],
  sources: [
    { label: "Vegtrafikkloven §§ 21, 22 og 33", url: VTL },
    { label: "Førerkortforskriften vedlegg 1", url: "https://lovdata.no/forskrift/2004-01-19-298/§9" },
  ],
};

export const miljo: Article = {
  id: "miljo",
  title: "Miljøvennlig kjøring",
  group: "Mennesket i trafikken",
  order: 2,
  intro: "Mindre forbruk og utslipp gjennom planlegging og jevn kjøring.",
  sections: [
    {
      heading: "Slik sparer du energi",
      bullets: [
        "Se langt fram, kjør jevnt og la bilen rulle ned i fart.",
        "Riktig dekktrykk og ingen unødvendig last eller takboks.",
        "Ikke la motoren gå på tomgang unødvendig – det er heller ikke lov.",
      ],
    },
  ],
  sources: [{ label: "Trafikkreglene § 16 nr. 1", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" }],
};
