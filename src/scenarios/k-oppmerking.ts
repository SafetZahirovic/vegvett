import { knowledge } from "./kunnskap";

/** Linjer, piler og sperreområder. */
export const kOppmerking = knowledge({
  id: "k-oppmerking",
  title: "Linjer, piler og sperreområder",
  topic: "oppmerking",
  difficulty: 2,
  questions: [
    {
      id: "ko-heltrukken-felt",
      type: "yesno",
      prompt: "To felt i samme retning er skilt med en heltrukken hvit linje. Kan du skifte felt over linjen?",
      correct: false,
      explanation: "En heltrukken linje mellom feltene er en sperrelinje, og den skal ikke krysses. Vil du skifte felt, må du gjøre det der linjen er stiplet.",
      rule: "Skiltforskriften § 22 (oppmerking 1004 Sperrelinje)",
      highlight: [],
    },
    {
      id: "ko-sperrefelt",
      type: "yesno",
      prompt: "Kan du kjøre over et sperreområde (stripet område med heltrukken kant) for å komme fortere fram?",
      correct: false,
      explanation: "Du må ikke kjøre på et sperreområde som er avgrenset av en heltrukken linje.",
      rule: "Skiltforskriften § 22 (oppmerking 1014 Sperreområde)",
      highlight: [],
    },
    {
      id: "ko-piler",
      type: "choice",
      prompt: "Feltet ditt har en pil som bare peker til venstre. Hva betyr det?",
      options: [
        { id: "venstre", text: "Feltet er for trafikk som skal til venstre" },
        { id: "anbefaling", text: "Det er en anbefaling, du kan kjøre rett fram" },
        { id: "forbud", text: "Det er forbudt å svinge til venstre" },
        { id: "buss", text: "Feltet er bare for buss" },
      ],
      correct: "venstre",
      explanation:
        "Kjørefeltpiler viser hvilke retninger du kan kjøre fra feltet. Velg felt i god tid, så du slipper å skifte felt i siste liten.",
      rule: "Skiltforskriften § 22 (oppmerking 1034 Piler)",
      highlight: [],
    },
    {
      id: "ko-gul-hvit",
      type: "choice",
      prompt: "Hva skiller gule og hvite linjer på vegen?",
      options: [
        { id: "retning", text: "Gule skiller trafikk i motsatt retning, hvite skiller trafikk i samme retning" },
        { id: "fart", text: "Gule betyr lavere fartsgrense" },
        { id: "midlertidig", text: "Gule er alltid midlertidige" },
        { id: "ingen", text: "Det er ingen forskjell" },
      ],
      correct: "retning",
      explanation:
        "Gul farge brukes på linjer som skiller trafikk i motsatt retning, og på venstre kantlinje på veger med midtdeler. Hvite linjer skiller felt med samme retning og brukes som høyre kantlinje.",
      rule: "Skiltforskriften § 21",
      highlight: [],
    },
  ],
});
