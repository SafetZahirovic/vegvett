import { HW, LANE } from "../scene/road";
import { drive } from "./routes";
import type { Scenario } from "./types";

/** Fjellveg med flere fareskilt. Hvert besøk spør om noen av dem. */
export const fjellveg: Scenario = {
  id: "fjellveg",
  title: "Fjellveg",
  topic: "skilt",
  difficulty: 2,
  road: { type: "rett" },
  signs: [
    { id: "bakke", code: "104.2", pos: [HW + 1.5, 6], facing: "S" },
    { id: "svinger", code: "102.1", pos: [HW + 1.5, 16], facing: "S" },
    { id: "smalere", code: "106.1", pos: [HW + 1.5, 26], facing: "S" },
  ],
  markings: [],
  vehicles: [],
  animals: [{ id: "sau", type: "sau", name: "Sauen ved vegkanten", pos: [-HW - 1.5, 34], heading: "S" }],
  decor: [
    { type: "tre", pos: [-9, 10], size: 0.8 },
    { type: "tre", pos: [11, 20], size: 0.7 },
    { type: "tre", pos: [-12, 30], size: 0.9 },
  ],
  player: { route: drive([LANE / 2, 0], "N", [["fwd", 50]]) },
  questions: [
    {
      id: "fv-bakke",
      type: "choice",
      prompt: "Hva varsler det første skiltet?",
      hidesSign: "bakke",
      options: [
        { id: "fall", text: "Bratt bakke nedover" },
        { id: "stigning", text: "Bratt bakke oppover" },
        { id: "ras", text: "Rasfare" },
        { id: "kai", text: "Kai eller strandkant" },
      ],
      correct: "fall",
      explanation: "Skilt 104.2 varsler bratt bakke nedover. Prosenttallet viser hvor bratt det er.",
      rule: "Skiltforskriften § 4 (skilt 104)",
      highlight: ["bakke"],
    },
    {
      id: "fv-svinger",
      type: "choice",
      prompt: "Hva varsler det andre skiltet?",
      hidesSign: "svinger",
      options: [
        { id: "svinger", text: "Farlige svinger, den første til høyre" },
        { id: "sving", text: "Én farlig sving til høyre" },
        { id: "glatt", text: "Glatt kjørebane" },
        { id: "smal", text: "Smalere veg" },
      ],
      correct: "svinger",
      explanation: "Skilt 102.1 Farlige svinger varsler flere svinger etter hverandre, den første til høyre.",
      rule: "Skiltforskriften § 4 (skilt 102)",
      highlight: ["svinger"],
    },
    {
      id: "fv-smalere",
      type: "choice",
      prompt: "Hva varsler det tredje skiltet?",
      hidesSign: "smalere",
      options: [
        { id: "smalere", text: "Smalere veg" },
        { id: "bru", text: "Smal bru" },
        { id: "felt", text: "Feltet slutter" },
        { id: "motende", text: "Møtende trafikk" },
      ],
      correct: "smalere",
      explanation: "Skilt 106.1 Smalere veg varsler at vegen blir smalere på begge sider.",
      rule: "Skiltforskriften § 4 (skilt 106)",
      highlight: ["smalere"],
    },
    {
      id: "fv-nedover",
      type: "choice",
      prompt: "Hvordan kjører du ned den bratte bakken?",
      options: [
        { id: "gir", text: "Med lav fart, gjerne lavere gir så motoren hjelper til å bremse" },
        { id: "fri", text: "I fri, så bilen ruller lett" },
        { id: "brems", text: "Med foten hardt på bremsen hele veien" },
        { id: "fort", text: "Fort, for å komme raskt ned" },
      ],
      correct: "gir",
      explanation:
        "Farten skal tilpasses vegen. I lange, bratte bakker hjelper motorbrems mot at bremsene blir overopphetet.",
      rule: "Vegtrafikkloven § 6 første ledd",
      highlight: ["bakke"],
    },
  ],
};
