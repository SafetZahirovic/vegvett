import type { Article } from "../types";

export const ulykke: Article = {
  id: "ulykke",
  title: "Trafikkuhell og førstehjelp",
  group: "Sikkerhet og førstehjelp",
  order: 1,
  topics: ["sikkerhet"],
  intro: "Sikre, varsle, hjelpe – og pliktene dine når du er innblandet.",
  sections: [
    {
      heading: "Sikre – varsle – hjelpe",
      bullets: [
        "Sikre: nødsignallys, refleksvest og varseltrekant minst 150 m unna, så ingen flere blir skadet.",
        "Varsle: 113 ambulanse, 112 politi, 110 brann.",
        "Hjelpe: sjekk bevissthet og pust. Puster personen normalt: stabilt sideleie. Puster personen ikke normalt: hjerte-lunge-redning 30:2.",
      ],
    },
    {
      heading: "Pliktene dine",
      bullets: [
        "Alle innblandede skal stanse straks og hjelpe skadde mennesker og dyr – uansett skyld.",
        "Oppgi navn og adresse til hverandre, og føreren skal oppgi bileierens navn og kjennemerke.",
        "Ved død eller ikke ubetydelig skade skal politiet varsles snarest.",
        "Ved bare materiell skade uten noen til stede: varsle skadelidte eller politiet.",
      ],
    },
  ],
  sources: [
    { label: "Vegtrafikkloven § 12", url: "https://lovdata.no/dokument/NL/lov/1965-06-18-4" },
    { label: "Bruksforskriften § 1-6", url: "https://lovdata.no/dokument/SF/forskrift/1990-01-25-92" },
    { label: "Norsk resuscitasjonsråd (via NHI): hjerte-lunge-redning", url: "https://nhi.no/forstehjelp/bevisstloshet/hjertelungeredning-voksen" },
  ],
};

export const tunnelSikkerhet: Article = {
  id: "tunnel",
  title: "Sikkerhet i tunnel",
  group: "Sikkerhet og førstehjelp",
  order: 2,
  intro: "I tunnel må du ofte redde deg selv. Vit hva du gjør før det skjer.",
  sections: [
    {
      heading: "Ved brann",
      bullets: [
        "Kjør ut av tunnelen hvis du kan.",
        "Går ikke det: sett bilen til siden med nødsignallys, la nøkkelen stå og gå til fots mot nærmeste utgang eller nødutgang. Ikke vent på hjelp.",
        "Bruk nødtelefonen i nødstasjonen – da ser trafikksentralen hvor du er.",
      ],
    },
    {
      heading: "Ellers",
      bullets: [
        "Hold god avstand og ha lyset på.",
        "Kjør aldri inn når det blinker rødt eller bommen er nede.",
        "Det er forbudt å stanse i tunnel.",
      ],
    },
  ],
  sources: [
    { label: "Statens vegvesen: Brann i tunnel", url: "https://www.vegvesen.no/trafikkinformasjon/trafikksikkerhet/trygg-i-tunnel/brann-i-tunnel/" },
    { label: "Trafikkreglene § 17 nr. 1 a", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
  ],
};

export const barnIBil: Article = {
  id: "barn-i-bil",
  title: "Bilbelte og barn i bil",
  group: "Sikkerhet og førstehjelp",
  order: 3,
  licences: ["B"],
  intro: "Alle skal være sikret – og føreren har ansvaret for passasjerer under 15 år.",
  sections: [
    {
      heading: "Bilbelte",
      text: "Du skal bruke belte der det finnes. Unntak er blant annet når du rygger eller kjører på parkeringsplass.",
    },
    {
      heading: "Barn",
      bullets: [
        "Barn under 135 cm skal alltid bruke godkjent sikringsutstyr tilpasset vekt og høyde.",
        "Barn mellom 135 og 150 cm skal bruke slikt utstyr hvis det finnes i bilen.",
        "Bakovervendt barnesete er forbudt foran en aktiv kollisjonspute.",
        "Trygg Trafikk anbefaler bakovervendt sete til barnet er minst 4 år.",
      ],
    },
  ],
  sources: [
    { label: "Forskrift om verneutstyr (FOR-1979-09-21-7)", url: "https://lovdata.no/dokument/SF/forskrift/1979-09-21-7" },
    { label: "Statens vegvesen: Regelverket for sikring av barn", url: "https://www.vegvesen.no/trafikkinformasjon/trafikksikkerhet/sikker-kjoring/sikring-av-barn-i-bil/regelverket-for-sikring-av-barn/" },
  ],
};

export const planovergang: Article = {
  id: "planovergang",
  title: "Planovergang og trikk",
  group: "Vikeplikt og kryss",
  order: 5,
  intro: "Tog og trikk kan ikke svinge unna. Du skal gi dem fri veg.",
  sections: [
    {
      heading: "Planovergang",
      bullets: [
        "Skilt 134 varsler planovergang med bom, 135 uten bom.",
        "Rødt blinklys: stans ved stopplinjen eller i trygg avstand.",
        "Vær alltid oppmerksom på tog – også der overgangen er sikret.",
        "Du må ikke stanse nærmere en planovergang enn 5 meter.",
      ],
    },
    {
      heading: "Trikk",
      bullets: [
        "Gi fri veg for trikk, og stans om nødvendig.",
        "Ved holdeplass uten trafikkøy skal du stanse og slippe passasjerene fram.",
        "Du kan kjøre forbi en trikk på høyre side.",
        "Hold særlig lav fart ved trikk eller buss som har stanset ved holdeplass.",
      ],
    },
  ],
  sources: [
    { label: "Trafikkreglene §§ 9, 10, 12, 13 og 17", url: "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" },
    { label: "Skiltforskriften § 4 og § 24", url: "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219" },
  ],
};
