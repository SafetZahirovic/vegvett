import type { Article } from "../types";

export const dyr: Article = {
  id: "dyr",
  title: "Dyr på vegen",
  group: "Mennesket i trafikken",
  order: 5,
  topics: ["dyr"],
  intro: "Elg, rein, hjort, storfe og sau kan dukke opp uten forvarsel. Fareskilt 146 varsler steder der dyr ofte krysser.",
  sections: [
    {
      heading: "Slik kjører du",
      bullets: [
        "Senk farten der det er varslet dyr, og vær klar til å stanse.",
        "Står det dyr i vegen, stans om nødvendig og vent til vegen er fri.",
        "Dyr kan bevege seg uforutsigbart – tut og høy fart hjelper ikke.",
      ],
    },
    {
      heading: "Hvis du kjører på et dyr",
      text: "Den som er innblandet i en trafikkulykke, skal straks stanse og hjelpe skadde – det gjelder også dyr.",
    },
  ],
  sources: [
    { label: "Vegtrafikkloven § 3 og § 12", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
    { label: "Skiltforskriften § 4 (skilt 146)", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
  ],
};

export const syklister: Article = {
  id: "syklister",
  title: "Syklister",
  group: "Mennesket i trafikken",
  order: 4,
  topics: ["sykkel"],
  intro: "Syklister på kjørebanen er kjørende med samme rettigheter. Fra sykkelveg har de vikeplikt.",
  sections: [
    {
      heading: "Vikeplikt",
      bullets: [
        "En syklist på kjørebanen omfattes av høyreregelen som andre kjørende.",
        "Den som kommer fra sykkelveg, gang- og sykkelveg eller fortau og skal inn på eller krysse vegen, har vikeplikt.",
      ],
    },
    {
      heading: "Gang- og sykkelveg",
      text: "Gang- og sykkelveg er for gående og syklende. Du kan ikke kjøre motorvogn der, og det er forbudt å stanse på sykkelveg.",
    },
    {
      heading: "Forbikjøring",
      text: "Hold god sideavstand – Statens vegvesen anbefaler minst 1,5 meter – og vent hvis det ikke er plass. Sperrelinjen gjelder også når du skal forbi en syklist.",
    },
  ],
  sources: [
    { label: "Trafikkreglene § 4 nr. 1, § 7 nr. 2 og 4, § 12, § 17", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
  ],
};
