import { knowledge } from "./kunnskap";

/** Bilens lys, varseltrekant og refleksvest. */
export const kLysUtstyr = knowledge({
  id: "k-lys-utstyr",
  title: "Lys og sikringsutstyr",
  topic: "kjoretoy",
  questions: [
    {
      id: "kl-fjernlys",
      type: "choice",
      prompt: "En bil kommer mot deg i mørket. Hva gjør du med fjernlyset?",
      options: [
        { id: "blend", text: "Blender av til nærlys, så du ikke blender den møtende" },
        { id: "behold", text: "Beholder fjernlyset, det er tryggest for deg" },
        { id: "av", text: "Slår av alt lys" },
        { id: "blink", text: "Blinker med fjernlyset" },
      ],
      correct: "blend",
      explanation: "Fjernlys må ikke blende andre trafikanter. Bytt til nærlys når du møter eller kjører bak noen.",
      rule: "Trafikkreglene § 15 nr. 2 og 3",
      highlight: [],
    },
    {
      id: "kl-parkering",
      type: "choice",
      prompt: "Hvilket lys skal du bruke når du har parkert langs vegen i mørket?",
      options: [
        { id: "park", text: "Parkeringslys – hovedlysene skal være slått av" },
        { id: "naer", text: "Nærlys" },
        { id: "fjern", text: "Fjernlys" },
        { id: "ingen", text: "Ingen lys" },
      ],
      correct: "park",
      explanation: "Ved stans og parkering skal hovedlysene slås av, og parkeringslys brukes.",
      rule: "Trafikkreglene § 15 nr. 4",
      highlight: [],
    },
    {
      id: "kl-trekant",
      type: "choice",
      prompt: "Bilen har stanset og står til fare. Hvor langt bak bilen bør du sette varseltrekanten, hvis det er mulig?",
      options: [
        { id: "150", text: "Minst 150 meter" },
        { id: "10", text: "10 meter" },
        { id: "50", text: "50 meter" },
        { id: "inntil", text: "Rett bak bilen" },
      ],
      correct: "150",
      explanation:
        "Varseltrekanten skal om mulig settes minst 150 meter fra kjøretøyet, så andre får varsel i tide. Bruk også nødsignallys.",
      rule: "Bruksforskriften § 1-6 nr. 2",
      highlight: [],
    },
    {
      id: "kl-vest",
      type: "yesno",
      prompt: "Er det påbudt å ha refleksvest i bilen, lett tilgjengelig for føreren?",
      correct: true,
      explanation:
        "Bilen skal ha minst én refleksvest lett tilgjengelig for føreren. Den skal brukes når du går ut av bilen ved stans langs vegen der det kan være fare.",
      rule: "Bruksforskriften § 1-6 nr. 3",
      highlight: [],
    },
    {
      id: "kl-fare",
      type: "choice",
      prompt: "Bilen stanser og står til hinder, og du får den ikke flyttet straks. Hva må du gjøre?",
      options: [
        { id: "varsle", text: "Varsle andre med nødsignallys, varseltrekant eller på annen måte" },
        { id: "vente", text: "Sitte i bilen og vente på hjelp" },
        { id: "ingenting", text: "Ingenting, så lenge du har lyset på" },
        { id: "tute", text: "Tute når noen nærmer seg" },
      ],
      correct: "varsle",
      explanation:
        "Står kjøretøyet til fare eller hinder og ikke kan flyttes straks, skal du varsle andre trafikanter.",
      rule: "Bruksforskriften § 1-6 nr. 2",
      highlight: [],
    },
  ],
});
