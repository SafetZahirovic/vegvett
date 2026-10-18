import { PLAYER_ID, type Question, type Scenario, type Topic, type Turn, type VehicleType } from "../scenarios/types";
import { signTitle } from "../signs/registry";

export const VEHICLE_LABEL: Record<VehicleType, string> = {
  personbil: "Personbil",
  sykkel: "Sykkel",
  buss: "Buss",
  utrykning: "Utrykningskjøretøy",
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
  if (id === PLAYER_ID) return "Du (blå bil)";
  const v = scenario.vehicles.find((x) => x.id === id);
  if (v) return v.name ?? VEHICLE_LABEL[v.type];
  const p = scenario.pedestrians?.find((x) => x.id === id);
  if (p) return p.name ?? "Fotgjenger";
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
