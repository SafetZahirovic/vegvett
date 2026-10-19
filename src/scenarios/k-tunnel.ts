import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Sikkerhet i tunnel: brann, nødtelefon, rødt lys. */
export const kTunnel: Scenario = {
  id: "k-tunnel",
  title: "Sikkerhet i tunnel",
  topic: "sikkerhet",
  difficulty: 2,
  road: { type: "rett" },
  centerLine: [{ type: "midtlinje", to: 18 }, { type: "sperrelinje", from: 18 }],
  signs: [{ id: "tunnel-skilt", code: "122", pos: [HW + 1.5, 8], facing: "S" }],
  markings: [],
  vehicles: [],
  decor: [
    { type: "hus", pos: [-12, 34], size: 1.6 },
    { type: "hus", pos: [12, 34], size: 1.6 },
    { type: "tre", pos: [-10, 12] },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "ktu-brann",
      type: "choice",
      prompt: "Det brenner i en bil inne i tunnelen. Du kan ikke kjøre ut. Hva gjør du?",
      options: [
        { id: "ut", text: "Setter bilen til siden med nødsignallys og går ut av tunnelen til fots" },
        { id: "vente", text: "Blir sittende i bilen og venter på brannvesenet" },
        { id: "rygge", text: "Rygger ut av tunnelen" },
        { id: "slokke", text: "Kjører forbi brannen så fort som mulig" },
      ],
      correct: "ut",
      explanation:
        "Handle raskt og ikke vent på hjelp. Sett bilen til siden med nødsignallys og gå til fots mot nærmeste utgang eller nødutgang.",
      rule: "Statens vegvesen: Brann i tunnel",
      highlight: [],
    },
    {
      id: "ktu-telefon",
      type: "yesno",
      prompt: "Bør du bruke nødtelefonen i tunnelen i stedet for mobilen når du skal melde fra?",
      correct: true,
      explanation: "Nødtelefonen viser Vegtrafikksentralen nøyaktig hvor du er, så hjelpen kommer raskere.",
      rule: "Statens vegvesen: Brann i tunnel",
      highlight: [],
    },
    {
      id: "ktu-rodt",
      type: "choice",
      prompt: "Det blinker rødt foran tunnelinnkjøringen. Hva gjør du?",
      options: [
        { id: "stans", text: "Stanser og kjører ikke inn" },
        { id: "forsiktig", text: "Kjører forsiktig inn" },
        { id: "snu", text: "Snur med en gang uansett trafikk" },
        { id: "fort", text: "Kjører fort gjennom før det blir verre" },
      ],
      correct: "stans",
      explanation: "Kjør aldri inn når det blinker rødt eller bommen er nede. Snu bare hvis du får beskjed om det.",
      rule: "Statens vegvesen: Trygg i tunnel",
      highlight: [],
    },
    {
      id: "ktu-stans",
      type: "yesno",
      prompt: "Er det lov å stanse i tunnelen for å ta en telefon?",
      correct: false,
      explanation: "Det er forbudt å stanse i tunnel.",
      rule: "Trafikkreglene § 17 nr. 1 a",
      highlight: [],
    },
  ],
};
