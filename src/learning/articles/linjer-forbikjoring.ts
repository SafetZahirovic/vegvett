import type { Article } from "../types";

export const linjerForbikjoring: Article = {
  id: "linjer-forbikjoring",
  title: "Linjer på vegen og forbikjøring",
  group: "Fart, plassering og forbikjøring",
  order: 2,
  topics: ["forbikjoring", "oppmerking"],
  intro: "Gule linjer skiller kjøreretningene. Typen linje forteller om du kan krysse den.",
  sections: [
    {
      heading: "Midtlinjene",
      bullets: [
        "Vanlig midtlinje (korte streker, lange mellomrom) kan krysses når det er trygt.",
        "Varsellinje (lange streker, korte mellomrom): sikten er for kort til vanlig forbikjøring – vær ekstra forsiktig.",
        "Sperrelinje (heltrukken): du skal ikke kjøre på eller over den – heller ikke for å passere en syklist eller svinge.",
      ],
    },
    {
      heading: "Forbikjøring",
      bullets: [
        "Forbikjøring skjer til venstre, og krever fri sikt og god avstand.",
        "Skilt 334 forbyr forbikjøring av motorvogn med mer enn to hjul, til skilt 336.",
        "Statens vegvesen anbefaler minst 1,5 meter sideavstand til syklister.",
      ],
    },
  ],
  sources: [
    { label: "Trafikkreglene § 12", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Skiltforskriften § 8 (334/336) og § 22 (oppmerking)", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
  ],
};
