import type { Article } from "../types";

export const fartsgrenser: Article = {
  id: "fartsgrenser",
  title: "Fartsgrenser og forsvarlig fart",
  group: "Fart, plassering og forbikjøring",
  order: 1,
  topics: ["fart"],
  intro: "Fartsgrensen er den høyeste lovlige farten – ikke en anbefaling. Forholdene avgjør hva som er forsvarlig.",
  sections: [
    {
      heading: "Generelle grenser",
      text: "Uten annen skilting er grensen 50 km/t i tettbygd strøk og 80 km/t utenfor. Skilt 362 viser en særskilt grense, og 364 opphever den. Skilt 366 Fartsgrensesone gjelder i hele sonen, også sidegatene.",
    },
    {
      heading: "Tilpass farten",
      bullets: [
        "Farten skal alltid tilpasses vegen, sikten, føret og trafikken.",
        "Du skal kunne stanse på den strekningen du har oversikt over.",
        "Fareskilt som farlig sving, glatt kjørebane og fartshump er tegn på at du bør senke farten.",
      ],
    },
  ],
  sources: [
    { label: "Vegtrafikkloven § 6", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
    { label: "Trafikkreglene § 13 nr. 1", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Skiltforskriften § 8 (362, 364, 366)", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
  ],
};
