import type { Article } from "../types";

export const gangfelt: Article = {
  id: "gangfelt",
  title: "Gangfelt og gående",
  group: "Vikeplikt og kryss",
  order: 3,
  topics: ["gangfelt"],
  intro: "Ved et uregulert gangfelt har du vikeplikt for gående som er i gangfeltet eller på vei ut i det.",
  sections: [
    {
      heading: "Vikeplikt ved gangfelt",
      text: "Følg med på fortauet i god tid. Ser det ut som noen skal krysse, skal du senke farten og stanse.",
    },
    {
      heading: "Ting du ikke skal gjøre",
      bullets: [
        "Ikke stans slik at bilen blir stående i gangfeltet, for eksempel i kø.",
        "Ikke kjør forbi når sikten mot gangfeltet er hindret, for eksempel av en bil som har stanset foran det.",
      ],
    },
    {
      heading: "Skilt og oppmerking",
      text: "Skilt 516 Gangfelt (blått) står ved gangfeltet. Oppmerkingen med striper har samme virkning. Fareskilt 140 varsler gangfelt lenger fram, og 142 Barn varsler steder der barn ofte ferdes.",
    },
  ],
  sources: [
    { label: "Trafikkreglene § 9 og § 12 nr. 6", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Skiltforskriften § 12 (516) og § 22 (1024)", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
  ],
};
