import type { Article } from "../types";

export const vikeplikt: Article = {
  id: "vikeplikt",
  title: "Vikeplikt og høyreregelen",
  group: "Vikeplikt og kryss",
  order: 1,
  topics: ["vikeplikt"],
  intro: "Hvem skal kjøre først i et kryss? Svaret avhenger av skilt, oppmerking og – når ingenting er skiltet – høyreregelen.",
  sections: [
    {
      heading: "Hva betyr det å ha vikeplikt?",
      text: "Har du vikeplikt, skal du kjøre slik at den du skal vike for, ikke må endre fart eller retning brått. Vis tydelig, i god tid, at du har tenkt å vike – senk farten og stans om nødvendig.",
    },
    {
      heading: "Høyreregelen",
      text: "I et kryss uten skilt eller oppmerking har du vikeplikt for kjørende som kommer fra høyre. Det gjelder også i T-kryss, og også overfor syklister som kommer fra høyre på kjørebanen.",
      bullets: [
        "Den som svinger til venstre, får møtende på sin høyre side og må vike for dem.",
        "Høyreregelen gjelder ikke for den som kommer fra parkeringsplass, eiendom, sykkelveg eller fortau – de har vikeplikt for alle.",
      ],
    },
    {
      heading: "Skilt som bestemmer vikeplikten",
      bullets: [
        "202 Vikeplikt (trekant med spissen ned): vik for trafikk fra begge retninger på vegen du skal inn på.",
        "204 Stopp: stans helt ved stopplinjen – også når vegen er fri – og vik deretter.",
        "206 Forkjørsveg: trafikk fra sidevegene har vikeplikt for deg, helt til 208 Slutt på forkjørsveg.",
        "210 Forkjørskryss varsler et kryss der sidevegene har vikeplikt.",
      ],
    },
    {
      heading: "Vikelinje og stopplinje",
      text: "Vikelinjen («haitenner») viser hvor du skal stanse hvis det trengs for å vike. Spissene peker mot den som har vikeplikt. Stopplinjen er en bred, heltrukken linje som hører til stoppskilt eller lyssignal.",
    },
    {
      heading: "Husk",
      text: "Selv om du har forkjørsrett, skal du være aktpågivende og kunne stanse hvis noen ikke overholder vikeplikten.",
    },
  ],
  sources: [
    { label: "Trafikkreglene § 7 (vikeplikt)", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Skiltforskriften §§ 5–6 og § 22", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
    { label: "Vegtrafikkloven § 3 (grunnregelen)", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
  ],
};
