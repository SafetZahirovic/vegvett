import type { Article } from "../types";

export const bussUtrykning: Article = {
  id: "buss-utrykning",
  title: "Buss og utrykningskjøretøy",
  group: "Vikeplikt og kryss",
  order: 4,
  topics: ["buss", "utrykning"],
  intro: "To kjøretøy med særregler: bussen som skal ut fra holdeplass, og utrykningskjøretøy med blålys.",
  sections: [
    {
      heading: "Buss fra holdeplass",
      text: "På veg med fartsgrense 60 km/t eller lavere har du vikeplikt for buss som gir tegn om å kjøre ut fra holdeplassen. Bussføreren skal likevel unngå fare.",
    },
    {
      heading: "Utrykningskjøretøy",
      bullets: [
        "Gi fri veg for utrykningskjøretøy med blinkende blått lys, og stans om nødvendig.",
        "Plikten gjelder alle – også møtende, og også når du har grønt lys.",
        "Kjør rolig og forutsigbart til siden.",
      ],
    },
  ],
  sources: [
    { label: "Trafikkreglene § 7 nr. 5 og § 10 nr. 1", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
  ],
};
