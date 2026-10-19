import type { Article } from "../types";

export const mcPlassering: Article = {
  id: "mc-kjoring",
  title: "Plassering, sving og bremsing på MC",
  group: "Motorsykkel",
  order: 1,
  licences: ["A"],
  topics: ["motorsykkel"],
  intro: "Råd fra Statens vegvesens læreplan for klasse A, og reglene som gjelder for MC.",
  sections: [
    {
      heading: "Plassering i feltet",
      text: "Normalplasseringen på rett veg er litt til venstre for midten av eget felt, valgt ut fra sikt, synbarhet og veggrep. Loven sier bare at du skal holde til høyre så langt forholdene tillater og godt innenfor feltet.",
    },
    {
      heading: "Svinger",
      bullets: [
        "Senk farten før svingen, ikke i den.",
        "Se dit du vil kjøre.",
        "Høyresving: start i venstre del av feltet. Venstresving: start inntil kantlinjen.",
        "Hold deg alltid i eget felt.",
      ],
    },
    {
      heading: "Bremsing og avstand",
      text: "Normal bremsing gjøres med begge bremsene. Hold så stor avstand at du ikke kjører på den foran om den bremser.",
    },
    {
      heading: "Bli sett",
      text: "Ta aldri for gitt at du er sett. En motorsykkel er liten, og andre kan feilberegne fart og avstand – særlig biler som svinger til venstre foran deg eller kommer fra en sideveg.",
    },
  ],
  sources: [
    { label: "Statens vegvesen: Læreplan klasse A (veiledning)", url: "https://kudos.dfo.no/documents/8027/files/7917.pdf" },
    {
      label: "Statens vegvesen: Sikker på MC",
      url: "https://www.vegvesen.no/trafikkinformasjon/trafikksikkerhet/sikker-pa-mc/trafikksikkerhet/",
    },
    { label: "Trafikkreglene § 5", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
  ],
};

export const mcRegler: Article = {
  id: "mc-regler",
  title: "Regler for MC: hjelm, lys, passasjer og felt",
  group: "Motorsykkel",
  order: 2,
  licences: ["A"],
  intro: "Det du må vite om utstyr, passasjer og hvilke felt du kan bruke.",
  sections: [
    {
      heading: "Hjelm og utstyr",
      text: "Både fører og passasjer skal bruke godkjent hjelm. Føreren har ansvaret for at passasjerer under 15 år gjør det. Annet verneutstyr er sterkt anbefalt, men ikke påbudt.",
    },
    { heading: "Lys", text: "Lyset skal alltid være tent under kjøring. MC kan ha tåkelys tent sammen med nærlys i dagslys." },
    {
      heading: "Passasjer",
      text: "Du kan ikke ha med flere personer enn MC-en er registrert for. Det finnes ingen lovbestemt aldersgrense for passasjer.",
    },
    {
      heading: "Felt og forbikjøring",
      bullets: [
        "Tohjuls MC uten sidevogn kan bruke kollektivfelt, med mindre skilt sier noe annet.",
        "Sykkelfelt og sykkelveg kan ikke brukes.",
        "Kjøring mellom køer er ikke tillatt.",
        "Skilt 334: en bil kan kjøre forbi deg, men du kan ikke kjøre forbi en bil.",
      ],
    },
    {
      heading: "Tilhenger",
      text: "MC over 125 cm³ kan trekke tilhenger. Med tilhenger er høyeste fart 80 km/t.",
    },
  ],
  sources: [
    { label: "Forskrift om verneutstyr §§ 2–3", url: "https://lovdata.no/dokument/SF/forskrift/1979-09-21-7" },
    { label: "Trafikkreglene §§ 5, 12, 13 og 15", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Bruksforskriften §§ 3-1 og 4-2", url: "https://lovdata.no/dokument/SF/forskrift/1990-01-25-92" },
  ],
};
