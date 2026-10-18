import type { ReactNode } from "react";
import { PLAYER_ID } from "../scenarios/types";
import { CATEGORY_LABEL, getSign, signTitle } from "../signs/registry";
import { signImage } from "../signs/official";
import { useGame, useHiddenSigns, useScenario } from "../state/store";
import { ANIMAL_LABEL, INDICATOR_LABEL, TURN_LABEL, VEHICLE_LABEL } from "./labels";


export function InspectPanel() {
  const selected = useGame((s) => s.selected);
  const select = useGame((s) => s.select);
  const scenario = useScenario();
  const hiddenSigns = useHiddenSigns();
  const showAll = useGame((s) => s.showAllRoutes);
  if (!selected || selected.kind === "marker") return null;

  let body: ReactNode = null;
  if (selected.kind === "sign") {
    const placement = scenario.signs.find((s) => s.id === selected.id);
    if (!placement) return null;
    const def = getSign(placement.code);
    const art = signImage(placement.code, placement.value);
    const img = (
      <div className={`inspect-sign${art.official ? " is-official" : ""}`}>
        <img src={art.url} alt="" />
      </div>
    );
    // Et ubesvart spørsmål spør etter dette skiltet: ikke røp svaret.
    body = hiddenSigns.has(placement.id) ? (
      <>
        {img}
        <h2>Hvilket skilt er dette?</h2>
        <p className="rule-ref">Navn og forklaring vises når du har svart på spørsmålet.</p>
      </>
    ) : (
      <>
        {img}
        <h2>{signTitle(placement.code, placement.value)}</h2>
        <dl className="inspect-meta">
          <dt>Skiltnummer</dt>
          <dd>{def.code}</dd>
          <dt>Kategori</dt>
          <dd>{CATEGORY_LABEL[def.category]}</dd>
        </dl>
        <p>{def.explanation}</p>
        <p className="rule-ref">{def.rule}</p>
      </>
    );
  } else if (selected.kind === "animal") {
    const animal = scenario.animals?.find((a) => a.id === selected.id);
    if (!animal) return null;
    body = (
      <>
        <h2>{animal.name ?? ANIMAL_LABEL[animal.type]}</h2>
        <dl className="inspect-meta">
          <dt>Dyr</dt>
          <dd>{ANIMAL_LABEL[animal.type]}</dd>
          <dt>Bevegelse</dt>
          <dd>{animal.route ? "Vist som pil på bakken" : "Står stille"}</dd>
        </dl>
        <p className="rule-ref">Dyr kan bevege seg uforutsigbart. Senk farten og vær klar til å stanse.</p>
      </>
    );
  } else if (selected.kind === "pedestrian") {
    const ped = scenario.pedestrians?.find((p) => p.id === selected.id);
    if (!ped) return null;
    body = (
      <>
        <h2>{ped.name ?? "Fotgjenger"}</h2>
        <dl className="inspect-meta">
          <dt>Type</dt>
          <dd>Gående</dd>
          <dt>Retning</dt>
          <dd>{ped.route ? "Vist som pil på bakken" : "Står stille"}</dd>
        </dl>
      </>
    );
  } else {
    const isPlayer = selected.id === PLAYER_ID;
    const vehicle = isPlayer
      ? { type: "personbil" as const, name: "Din bil", ...scenario.player }
      : scenario.vehicles.find((v) => v.id === selected.id);
    if (!vehicle) return null;
    body = (
      <>
        <h2>{vehicle.name ?? VEHICLE_LABEL[vehicle.type]}</h2>
        <dl className="inspect-meta">
          <dt>Type</dt>
          <dd>{VEHICLE_LABEL[vehicle.type]}</dd>
          <dt>Blinklys</dt>
          <dd>{vehicle.type === "sykkel" ? "–" : vehicle.indicator ? INDICATOR_LABEL[vehicle.indicator] : "Ingen"}</dd>
          {"siren" in vehicle && vehicle.siren && (
            <>
              <dt>Blålys</dt>
              <dd>På – under utrykning</dd>
            </>
          )}
          <dt>Kjørevei</dt>
          <dd>{vehicle.route ? TURN_LABEL[vehicle.route.turn] : "Ukjent"}</dd>
        </dl>
        {vehicle.route && !showAll && (
          <p className="rule-ref">Den planlagte kjøreveien vises som en pil på bakken.</p>
        )}
      </>
    );
  }

  return (
    <aside className="panel inspect" aria-label="Informasjon">
      <button className="panel-close" onClick={() => select(null)} aria-label="Lukk">
        ×
      </button>
      {body}
    </aside>
  );
}
