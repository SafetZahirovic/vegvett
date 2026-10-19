import type { Article } from "../types";

const BF = { label: "Bruksforskriften", url: "https://lovdata.no/dokument/SF/forskrift/1990-01-25-92" };
const TR = { label: "Trafikkreglene", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" };

export const dekk: Article = {
  id: "dekk",
  title: "Dekk og årstider",
  group: "Kjøretøy og teknikk",
  order: 1,
  topics: ["kjoretoy"],
  intro: "Mønsterdybde, vinterperiode og piggdekk – reglene i bruksforskriften.",
  sections: [
    {
      heading: "Mønsterdybde (personbil)",
      bullets: [
        "Sommer: minst 1,6 mm.",
        "Vinter: minst 3 mm, fra 1. november til første søndag etter 2. påskedag.",
        "I Nordland, Troms og Finnmark er sommerperioden bare 1. mai–15. oktober.",
      ],
    },
    {
      heading: "Piggdekk",
      text: "Piggdekk er ikke tillatt fra første mandag etter 2. påskedag til og med 31. oktober (i Nord-Norge 1. mai–15. oktober), med mindre føret gjør det nødvendig. Noen byer krever piggdekkgebyr.",
    },
    {
      heading: "Vinterdekk",
      text: "For personbil finnes ingen fast dato for vinterdekk, men dekkene må alltid passe for føret. Fast datoplikt gjelder kjøretøy over 3 500 kg.",
    },
    {
      heading: "Dekktrykk",
      text: "Følg bilprodusentens anbefaling, og sjekk trykket når dekkene er kalde. For lavt trykk gir dårligere veigrep og høyere forbruk.",
    },
  ],
  sources: [{ ...BF, label: "Bruksforskriften § 1-4" }],
};

export const lysUtstyr: Article = {
  id: "lys-utstyr",
  title: "Lys, varseltrekant og refleksvest",
  group: "Kjøretøy og teknikk",
  order: 2,
  intro: "Når du skal bruke hvilket lys – og hva du gjør når bilen står til fare.",
  sections: [
    {
      heading: "Lys under kjøring",
      bullets: [
        "Nærlys, fjernlys eller kjørelys skal alltid være tent når du kjører – også i tunnel og om dagen.",
        "Fjernlys skal ikke blende møtende eller dem du kjører bak.",
        "Ved stans og parkering i mørke: parkeringslys, hovedlysene av.",
      ],
    },
    {
      heading: "Når bilen står til fare",
      bullets: [
        "Varsle andre med nødsignallys, varseltrekant eller på annen måte.",
        "Sett varseltrekanten minst 150 meter unna hvis det er mulig.",
        "Refleksvest skal ligge lett tilgjengelig og brukes når du går ut av bilen langs vegen.",
      ],
    },
  ],
  sources: [
    { ...TR, label: "Trafikkreglene § 15" },
    { ...BF, label: "Bruksforskriften § 1-6" },
  ],
};

export const bilen: Article = {
  id: "bilen",
  title: "Varsellamper, førerstøtte og last",
  group: "Kjøretøy og teknikk",
  order: 3,
  intro: "Hva lampene i instrumentpanelet forteller, hva hjelpesystemene gjør – og hvordan du sikrer last.",
  sections: [
    {
      heading: "Varsellamper",
      bullets: [
        "Rød lampe: alvorlig feil (f.eks. oljetrykk eller bremser). Stans når det er trygt og undersøk.",
        "Gul/oransje lampe: noe bør sjekkes snart (f.eks. motorlampe, ABS, dekktrykk).",
        "Grønn/blå: bare informasjon. Følg alltid instruksjonsboka.",
      ],
    },
    {
      heading: "Førerstøttesystemer",
      text: "ABS hindrer at hjulene låser seg, så du kan styre mens du bremser. ESC hjelper mot skrens. Nødbremsassistent og adaptiv cruisekontroll hjelper, men du har alltid ansvaret – og systemene kan svikte i snø, is eller når sensorene er skitne.",
    },
    {
      heading: "Last",
      bullets: [
        "Last skal sikres slik at den bare kan flytte seg minimalt.",
        "Last som stikker mer enn 1 meter ut bak, skal merkes ytterst – i mørke også med lykt.",
      ],
    },
    {
      heading: "Før du kjører",
      text: "Sjekk at lys og blinklys virker, at dekkene er i orden, at rutene er rene og isfrie og at det ikke ligger snø på taket.",
    },
  ],
  sources: [
    { label: "Vegtrafikkloven §§ 3 og 21", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
    { ...BF, label: "Bruksforskriften §§ 3-3 og 3-4" },
    { label: "Statens vegvesen: temaliste for teoriprøven klasse B", url: "https://www.vegvesen.no/globalassets/forerkort/ta-forerkort/temaliste-til-teoriprove-klasse-b-bokmal.pdf" },
  ],
};

export const stopplengde: Article = {
  id: "stopplengde",
  title: "Reaksjonstid og stopplengde",
  group: "Fart, plassering og forbikjøring",
  order: 3,
  intro: "Hvorfor litt mer fart gir mye lengre stopplengde.",
  sections: [
    {
      heading: "Begrepene",
      bullets: [
        "Reaksjonslengde: strekningen du kjører fra du oppdager faren til du begynner å bremse.",
        "Bremselengde: strekningen bilen kjører mens du bremser.",
        "Stopplengde = reaksjonslengde + bremselengde.",
      ],
    },
    {
      heading: "Fart og føre",
      bullets: [
        "En opplagt fører reagerer på rundt ett sekund. Trøtthet, rus og mobil gjør tiden lengre.",
        "Bremselengden øker med kvadratet av farten: dobbel fart gir omtrent fire ganger så lang bremselengde.",
        "På is kan stopplengden bli mange ganger så lang som på tørr asfalt.",
      ],
    },
    {
      heading: "Tommelfingerregler",
      text: "Mange bruker «reaksjonslengde ≈ farten/10 × 3 meter» og «bremselengde ≈ (farten/10)² / 2 meter» på tørr asfalt. Det er grove anslag, ikke regler.",
    },
  ],
  sources: [{ label: "Statens vegvesen: temaliste for teoriprøven klasse B", url: "https://www.vegvesen.no/globalassets/forerkort/ta-forerkort/temaliste-til-teoriprove-klasse-b-bokmal.pdf" }],
};
