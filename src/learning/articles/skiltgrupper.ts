import type { Article } from "../types";

export const skiltgrupper: Article = {
  id: "skiltgrupper",
  title: "Skiltgruppene",
  group: "Trafikkskilt og oppmerking",
  order: 1,
  topics: ["skilt"],
  intro: "Formen og fargen forteller hvilken type skilt det er – nyttig når du ikke kjenner igjen symbolet.",
  sections: [
    {
      heading: "De viktigste gruppene",
      bullets: [
        "Fareskilt (100-serien): trekant med spissen opp, rød kant. Varsler fare.",
        "Vikeplikt- og forkjørsskilt (200-serien): f.eks. trekant med spissen ned, stopp og gul ruter.",
        "Forbudsskilt (300-serien): rund med rød kant. Forteller hva du ikke har lov til.",
        "Påbudsskilt (400-serien): runde og blå. Forteller hva du må gjøre.",
        "Opplysningsskilt (500-serien): blå firkanter. Gir informasjon, f.eks. gangfelt og motorveg.",
        "«Slutt på …»-skilt har grått symbol og svarte skråstriper.",
      ],
    },
    {
      heading: "Hva gjelder foran hva?",
      text: "Tegn fra politiet eller annen trafikkdirigent gjelder foran lyssignal, lyssignal gjelder foran skilt, og skilt gjelder foran de vanlige trafikkreglene.",
    },
    {
      heading: "Tips",
      text: "Se gjennom Skiltoversikten i menyen – der finner du alle Statens vegvesens skiltsymboler.",
    },
  ],
  sources: [{ label: "Skiltforskriften", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" }],
};
