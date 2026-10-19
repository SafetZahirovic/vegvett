import type { Article } from "../types";

export const ansvar: Article = {
  id: "ansvar",
  title: "Prikker, forsikring og hva som gjelder foran hva",
  group: "Lover og ansvar",
  order: 1,
  topics: ["ansvar"],
  intro: "Reglene som bestemmer konsekvensene av brudd – og hvilke anvisninger som går foran andre.",
  sections: [
    {
      heading: "Hva gjelder foran hva?",
      text: "Anvisning fra politiet (og andre med myndighet til å dirigere trafikken) går foran alt. Deretter lyssignal, så skilt og oppmerking, og til slutt de vanlige trafikkreglene.",
    },
    {
      heading: "Prikker",
      bullets: [
        "8 prikker innen 3 år gir tap av føreretten i 6 måneder.",
        "De fleste brudd gir 3 prikker, noen gir 2.",
        "I prøveperioden (de første 2 årene) får du dobbelt antall prikker.",
        "Eksempler: for høy fart, kjøring mot rødt lys, vikepliktbrudd, for kort avstand, usikrede barn og mobilbruk.",
      ],
    },
    {
      heading: "Mobil",
      text: "Du må ikke bruke håndholdt mobil under kjøring – heller ikke i kø eller på rødt lys. Samtaler med håndfri løsning eller telefon i fast holder er tillatt.",
    },
    {
      heading: "Forsikring",
      text: "En registrert bil skal ha trafikkforsikring. Den dekker skader på andre, også når ingen har skyld, men ikke skade på din egen bil.",
    },
    {
      heading: "Beslag og tap av førerett",
      text: "Politiet kan ta førerkortet ditt i beslag ved mistanke om et alvorlig brudd. Tap av førerett bestemmes i dom eller forelegg.",
    },
  ],
  sources: [
    { label: "Trafikkreglene § 3", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Forskrift om prikkbelastning", url: "https://lovdata.no/dokument/SF/forskrift/2003-09-19-1164" },
    { label: "Vegtrafikkloven § 33", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
    { label: "Bilansvarslova", url: "https://lovdata.no/dokument/NL/lov/1961-02-03" },
  ],
};

export const forerkort: Article = {
  id: "forerkort",
  title: "Førerkort, tilhenger og øvelseskjøring",
  group: "Lover og ansvar",
  order: 2,
  licences: ["B"],
  intro: "Hva klasse B gir deg lov til, og reglene for øvelseskjøring og teoriprøven.",
  sections: [
    {
      heading: "Klasse B",
      bullets: [
        "Bil med tillatt totalvekt på høyst 3 500 kg og høyst 8 passasjerer.",
        "Tilhenger på høyst 750 kg, eller tyngre hvis bil og tilhenger til sammen er høyst 3 500 kg (4 250 kg med kode 96).",
        "Tilhenger uten brems kan veie høyst halvparten av bilens egenvekt, og aldri over 750 kg. Se vognkortet.",
      ],
    },
    {
      heading: "Øvelseskjøring",
      bullets: [
        "Fra 16 år. Under 25 år må du ha trafikalt grunnkurs først.",
        "Ledsageren må ha fylt 25 år og ha hatt førerett i klassen i 5 år sammenhengende.",
        "Bilen skal ha L-skilt og ekstra speil til ledsageren.",
      ],
    },
    {
      heading: "Teoriprøven",
      text: "45 spørsmål, minst 38 riktige (maks 7 feil), 90 minutter. Tidligst ved 17,5 år for klasse B. Stryker du, må du vente to uker. Prøvemodus i Vegvett bruker samme format.",
    },
    {
      heading: "Prøveperioden",
      text: "De to første årene med førerkort er prøveperiode. Brudd gir dobbelt så mange prikker, og tap av føreretten kan bety ny førerprøve.",
    },
  ],
  sources: [
    { label: "Førerkortforskriften kap. 3 og § 4-2", url: "https://lovdata.no/dokument/SF/forskrift/2004-01-19-298" },
    { label: "Vegtrafikkloven § 26", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
    { label: "Statens vegvesen: gjennomføring av teoriprøven", url: "https://www.vegvesen.no/forerkort/ta-forerkort/teoriprove/gjennomforing-av-teoriproven/" },
  ],
};

export const flettingRygging: Article = {
  id: "fletting-rygging",
  title: "Feltskifte, fletting og rygging",
  group: "Fart, plassering og forbikjøring",
  order: 4,
  intro: "Hvem viker når felt slås sammen, når du skifter felt og når du rygger.",
  sections: [
    {
      heading: "Feltskifte",
      text: "Den som skifter felt, har vikeplikt for trafikken i feltet han skal inn i.",
    },
    {
      heading: "Glidelåsprinsippet",
      text: "Når to felt blir til ett, faller vikeplikten bort. Bilene tilpasser farten og kjører vekselvis, én fra hvert felt.",
    },
    {
      heading: "Motorveg",
      text: "Bruk akselerasjonsfeltet til å komme opp i samme fart som trafikken. De på motorvegen skal gjøre det lettere å komme inn. Skal du av, kjør inn i retardasjonsfeltet så tidlig som mulig.",
    },
    {
      heading: "Rygging og vending",
      text: "Den som rygger eller vender, har vikeplikt for alle. Det er forbudt på motorveg og motortrafikkveg og deres inn- og utkjøringer.",
    },
  ],
  sources: [{ label: "Trafikkreglene §§ 8 og 11", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" }],
};
