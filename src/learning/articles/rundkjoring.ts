import type { Article } from "../types";

export const rundkjoring: Article = {
  id: "rundkjoring",
  title: "Rundkjøring",
  group: "Vikeplikt og kryss",
  order: 2,
  topics: ["rundkjoring"],
  intro: "Inn mot klokka, vik for dem som allerede er i ringen, og blink til høyre før du kjører ut.",
  sections: [
    {
      heading: "Inn i rundkjøringen",
      text: "Ved innkjøringen står det normalt skilt 202 Vikeplikt og vikelinje. Da har du vikeplikt for trafikk som allerede kjører i rundkjøringen. Trafikkreglene har ingen egen rundkjøringsregel – det er skiltene og oppmerkingen som gir vikeplikten.",
    },
    {
      heading: "Kjøreretning",
      text: "Skilt 406 Påbudt rundkjøring viser at du skal kjøre mot klokka, med midtøya på venstre side. Det gjelder uansett hvor du skal – også når du skal til venstre.",
    },
    {
      heading: "Blinklys",
      bullets: [
        "Du skal gi tegn når du skifter retning – også når du kjører ut av rundkjøringen.",
        "Statens vegvesen anbefaler å blinke til høyre når du er ved avkjøringen før den du skal ta.",
        "Skal du ta første avkjøring, blinker du til høyre allerede før du kjører inn.",
        "Å blinke til venstre inn er ikke påbudt, men kan hjelpe andre.",
      ],
    },
    {
      heading: "Varsel",
      text: "Fareskilt 126 Rundkjøring står før selve rundkjøringen og varsler den. Senk farten i god tid.",
    },
  ],
  sources: [
    { label: "Skiltforskriften § 6 (202), § 10 (406), § 4 (126)", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
    { label: "Trafikkreglene § 14 nr. 2 (tegn)", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    {
      label: "Statens vegvesen: Kjøring i rundkjøringer",
      url: "https://www.vegvesen.no/trafikkinformasjon/trafikksikkerhet/trafikkregler/kjoring-i-rundkjoringer/",
    },
  ],
};
