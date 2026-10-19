import { PLAYER_ID, type SignalState, type AnimalType, type Question, type Scenario, type Topic, type Turn, type VehicleType } from "../scenarios/types";
import { signTitle } from "../signs/registry";

export const VEHICLE_LABEL: Record<VehicleType, string> = {
  personbil: "Personbil",
  sykkel: "Sykkel",
  buss: "Buss",
  utrykning: "Utrykningskjøretøy",
  motorsykkel: "Motorsykkel",
  trikk: "Trikk",
};
export const ANIMAL_LABEL: Record<AnimalType, string> = {
  elg: "Elg",
  rein: "Rein",
  hjort: "Hjort",
  ku: "Ku",
  sau: "Sau",
};

export const INDICATOR_LABEL = { left: "Blinker til venstre", right: "Blinker til høyre" };
export const TURN_LABEL: Record<Turn, string> = {
  straight: "Kjører rett frem",
  left: "Svinger til venstre",
  right: "Svinger til høyre",
  uturn: "Snur (kjører hele veien rundt)",
  pullout: "Kjører ut fra holdeplassen",
  pullover: "Kjører inn til siden og slipper forbi",
};

/** Lesbart navn på et objekt i scenen (brukt i fasit og forklaringer). */
export function objectName(scenario: Scenario, id: string): string {
  if (id === PLAYER_ID) return "Du";
  const l = scenario.lights?.find((x) => x.id === id);
  if (l) return "Trafikklyset";
  const m = scenario.markers?.find((x) => x.id === id);
  if (m) return m.name;
  const v = scenario.vehicles.find((x) => x.id === id);
  if (v) return v.name ?? VEHICLE_LABEL[v.type];
  const p = scenario.pedestrians?.find((x) => x.id === id);
  if (p) return p.name ?? "Fotgjenger";
  const a = scenario.animals?.find((x) => x.id === id);
  if (a) return a.name ?? ANIMAL_LABEL[a.type];
  const s = scenario.signs.find((x) => x.id === id);
  if (s) return `Skilt: ${signTitle(s.code, s.value)}`;
  return id;
}

export const TOPIC_LABEL: Record<Topic, string> = {
  skilt: "Skilt",
  vikeplikt: "Vikeplikt",
  rundkjoring: "Rundkjøring",
  gangfelt: "Gangfelt",
  forbikjoring: "Forbikjøring",
  oppmerking: "Oppmerking",
  utrykning: "Utrykning",
  buss: "Buss",
  fart: "Fart",
  dyr: "Dyr",
  sykkel: "Sykkel",
  motorsykkel: "Motorsykkel",
  kjoretoy: "Kjøretøy og teknikk",
  mennesket: "Mennesket i trafikken",
  sikkerhet: "Sikkerhet og førstehjelp",
  ansvar: "Lover og ansvar",
};

/** Lesbar tekst for et svar (brukt på resultatsiden). */
export function answerLabel(scenario: Scenario, q: Question, value: string | boolean | string[]): string {
  switch (q.type) {
    case "yesno":
      return value ? "Ja" : "Nei";
    case "choice":
      return q.options.find((o) => o.id === value)?.text ?? String(value);
    case "click":
      return objectName(scenario, String(value));
    case "order": {
      const ids = Array.isArray(value) ? value : String(value).split(",");
      return ids.map((id) => objectName(scenario, id)).join(" → ");
    }
  }
}

/** Hva et lyssignal viser, og hva det betyr for deg. */
export const SIGNAL_TEXT: Record<SignalState, { label: string; meaning: string }> = {
  rod: { label: "Rødt", meaning: "Stans ved stopplinjen og vent." },
  gul: {
    label: "Gult",
    meaning: "Det blir straks rødt. Stans, med mindre du er så nær at du ikke kan stanse trygt.",
  },
  gronn: { label: "Grønt", meaning: "Du kan kjøre, men følg vikepliktreglene – for eksempel overfor gående når du svinger." },
  rodgul: { label: "Rødt og gult", meaning: "Grønt kommer straks. Vent til det blir grønt." },
  gulblink: { label: "Gult blink", meaning: "Vær særlig forsiktig. Skilt og vanlige vikepliktregler gjelder." },
};
