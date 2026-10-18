/**
 * Datamodell for scenarioer.
 *
 * Koordinater er i meter på bakken: [u, v], der u = mot høyre og v = fremover,
 * sett fra spillerens bil. Spillerens bil står alltid i [PLAYER_U, 0] og kjører mot N.
 * Kjøreruter lages enklest med hjelpefunksjonene i `routes.ts`.
 */

export type Vec2 = [number, number];

/** Kompassretning i scenen. N = fremover for spilleren, E = mot høyre. */
export type Dir = "N" | "S" | "E" | "W";

/** Kjøreretning: kompassretning eller grader (0 = N, 90 = E), f.eks. for biler i rundkjøring. */
export type Heading = Dir | number;

export type RoadLayout =
  | { type: "rett" }
  /** Sidevei til venstre eller høyre som møter hovedveien ved v = at. */
  | { type: "t-kryss"; at: number; branch: "left" | "right" }
  /** Kryssende vei ved v = at. */
  | { type: "x-kryss"; at: number }
  /** Rundkjøring med sentrum i [0, at] og armer i alle fire retninger. */
  | { type: "rundkjoring"; at: number };

/** Midtlinje på hovedvegen. Standard er vanlig stiplet midtlinje. */
export type CenterLineType = "midtlinje" | "varsellinje" | "sperrelinje" | "midtdeler";

export type CenterLineSegment = {
  type: CenterLineType;
  /** Fra/til v (meter). Utelatt = hele scenarioet. */
  from?: number;
  to?: number;
};

export type RoadExtra =
  | { type: "busslomme"; from: number; to: number }
  /**
   * Gang- og sykkelveg langs hovedvegen, skilt fra kjørebanen med en grøftekant.
   * `side` sett i spillerens kjøreretning. Krysser eventuelle sideveger.
   */
  | { type: "sykkelveg"; side: "left" | "right"; from?: number; to?: number }
  /** Smalt vegparti (f.eks. smal bru eller vegarbeid) der bare ett kjøretøy får plass i bredden. */
  | { type: "smalt"; from: number; to: number };

export type SignPlacement = {
  id: string;
  code: string;
  /** F.eks. fartsgrense i km/t. */
  value?: number;
  /** Stolpens fotpunkt. */
  pos: Vec2;
  /** Retningen skiltflaten vender mot (mot trafikken skiltet gjelder for). */
  facing: Dir;
};

export type Marking = {
  id: string;
  type: "vikelinje" | "stopplinje" | "gangfelt";
  /** Linjen går fra a til b. */
  a: Vec2;
  b: Vec2;
  /** Vikelinje: retningen haitennene peker (mot den som har vikeplikt). */
  toward?: Dir;
  /** Gangfelt: bredde langs vegen (meter). */
  width?: number;
};

export type VehicleType = "personbil" | "sykkel" | "buss" | "utrykning";

export type Turn = "straight" | "left" | "right" | "uturn" | "pullout" | "pullover";

/** Planlagt kjørevei: punkter på bakken fra kjøretøyets midtpunkt og videre. */
export type Route = { points: Vec2[]; turn: Turn };

export type Vehicle = {
  id: string;
  type: VehicleType;
  /** Kort navn brukt i forklaringer, f.eks. «Den gule bilen». */
  name?: string;
  /** Midtpunkt på bakken. */
  pos: Vec2;
  heading: Heading;
  color?: string;
  indicator?: "left" | "right";
  /** Utrykningskjøretøy: blålys på. */
  siren?: boolean;
  route?: Route;
};

export type Pedestrian = {
  id: string;
  name?: string;
  pos: Vec2;
  heading: Heading;
  color?: string;
  route?: Route;
};

/** Id som fremhever hovedvegens midtlinje. */
export const CENTER_LINE_ID = "midtlinje";

export type AnimalType = "elg" | "rein" | "hjort" | "ku" | "sau";

export type Animal = {
  id: string;
  type: AnimalType;
  name?: string;
  pos: Vec2;
  heading: Heading;
  route?: Route;
};

/** Id for spillerens bil i klikk-/rekkefølgespørsmål og fremheving. */
export const PLAYER_ID = "player";

export type Decor = { type: "tre" | "hus"; pos: Vec2; size?: number };

export type Topic =
  | "skilt"
  | "vikeplikt"
  | "rundkjoring"
  | "gangfelt"
  | "forbikjoring"
  | "oppmerking"
  | "utrykning"
  | "buss"
  | "fart"
  | "dyr"
  | "sykkel";

type QuestionBase = {
  id: string;
  prompt: string;
  /** Kort, konkret forklaring av hvorfor svaret er riktig. */
  explanation: string;
  /** Regelhenvisning, f.eks. «Trafikkreglene § 7». */
  rule: string;
  /** Id-er til skilt, kjøretøy, fotgjengere eller oppmerking som fremheves ved feil svar (CENTER_LINE_ID = midtlinjen). */
  highlight: string[];
};

export type ChoiceQuestion = QuestionBase & {
  type: "choice";
  options: { id: string; text: string }[];
  correct: string;
  /** Skjul navnet på dette skiltet i infopanelet til spørsmålet er besvart. */
  hidesSign?: string;
};

export type YesNoQuestion = QuestionBase & { type: "yesno"; correct: boolean };

/** «Klikk på …»: svaret er id-en til et skilt eller kjøretøy (spilleren = PLAYER_ID). */
export type ClickQuestion = QuestionBase & { type: "click"; correct: string };

/** «Sett i riktig rekkefølge»: spilleren klikker kjøretøyene etter tur. */
export type OrderQuestion = QuestionBase & { type: "order"; correct: string[] };

export type Question = ChoiceQuestion | YesNoQuestion | ClickQuestion | OrderQuestion;

export type Scenario = {
  id: string;
  title: string;
  topic: Topic;
  difficulty: 1 | 2 | 3;
  road: RoadLayout;
  centerLine?: CenterLineSegment[];
  roadExtras?: RoadExtra[];
  signs: SignPlacement[];
  markings: Marking[];
  vehicles: Vehicle[];
  pedestrians?: Pedestrian[];
  animals?: Animal[];
  decor?: Decor[];
  player: { indicator?: "left" | "right"; route?: Route };
  /** Hvilket punkt på bakken kartet sentreres på (standard [0, 17], litt foran bilen). */
  view?: { focus: Vec2 };
  /** 1–3 spørsmål, stilles i rekkefølge. */
  questions: Question[];
};
