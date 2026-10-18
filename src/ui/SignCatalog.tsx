import { useMemo, useState } from "react";
import { OFFICIAL_SIGN_IDS } from "../signs/official-ids";
import { officialUrl } from "../signs/official";
import { CATEGORY_LABEL, SIGNS, signTitle } from "../signs/registry";
import { useGame } from "../state/store";

/** Skiltfamilie etter første siffer i skiltnummeret (skiltforskriften). */
const GROUPS: Record<string, string> = {
  "1": "Fareskilt",
  "2": "Vikeplikt- og forkjørsskilt",
  "3": "Forbudsskilt",
  "4": "Påbudsskilt",
  "5": "Opplysningsskilt",
  "6": "Serviceskilt",
  "7": "Vegvisningsskilt",
  "8": "Underskilt",
  "9": "Andre skilt",
};

/** Filnavn → skiltkode og eventuell verdi (f.eks. 362_50 → 362 med 50 km/t). */
function parseId(id: string): { code: string; value?: number; label: string } {
  const [main, sub] = id.split("_");
  if (!sub || sub === "0") return { code: main, label: main };
  if ((main === "362" || main === "364") && /^\d+$/.test(sub)) {
    return { code: main, value: Number(sub), label: `${main} (${sub})` };
  }
  return { code: `${main}.${sub}`, label: `${main}.${sub}` };
}

/** Alle offisielle skilt i pakken, med navn og forklaring der spillet kjenner skiltet. */
export function SignCatalog() {
  const setScreen = useGame((s) => s.setScreen);
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const items = OFFICIAL_SIGN_IDS.map((id) => {
      const p = parseId(id);
      const def = SIGNS[p.code];
      return { id, ...p, def, name: def ? signTitle(p.code, p.value) : null };
    });
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter((i) => i.label.includes(q) || i.name?.toLowerCase().includes(q))
      : items;
    return Object.entries(GROUPS)
      .map(([digit, title]) => ({ title, items: filtered.filter((i) => i.id.startsWith(digit)) }))
      .filter((g) => g.items.length);
  }, [query]);

  const selected = open ? groups.flatMap((g) => g.items).find((i) => i.id === open) : null;

  return (
    <div className="overlay">
      <section className="sheet catalog" aria-label="Skiltoversikt">
        <button className="panel-close" onClick={() => setScreen("menu")} aria-label="Lukk">
          ×
        </button>
        <p className="sheet-kicker">Skiltoversikt</p>
        <p className="sheet-lead">
          {OFFICIAL_SIGN_IDS.length} skilt fra Statens vegvesen. Skilt som brukes i spillet, har navn og forklaring.
        </p>
        <input
          className="catalog-search"
          type="search"
          placeholder="Søk på nummer eller navn, f.eks. 362 eller elg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {selected && (
          <div className="catalog-detail">
            <img src={officialUrl(selected.id)} alt="" />
            <div>
              <strong>{selected.name ?? `Skilt ${selected.label}`}</strong>
              <span className="tb-label">
                {selected.label} · {selected.def ? CATEGORY_LABEL[selected.def.category] : GROUPS[selected.id[0]]}
              </span>
              <p>{selected.def?.explanation ?? "Ikke brukt i spillet ennå."}</p>
              {selected.def && <p className="rule-ref">{selected.def.rule}</p>}
            </div>
          </div>
        )}
        {groups.map((g) => (
          <div key={g.title}>
            <h2>
              {g.title} ({g.items.length})
            </h2>
            <ul className="catalog-grid">
              {g.items.map((i) => (
                <li key={i.id}>
                  <button
                    className={`catalog-item${i.def ? " is-known" : ""}${open === i.id ? " is-open" : ""}`}
                    onClick={() => setOpen(open === i.id ? null : i.id)}
                    title={i.name ?? i.label}
                  >
                    <img src={officialUrl(i.id)} alt="" loading="lazy" />
                    <span>{i.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="rule-ref">
          Skiltsymboler: Statens vegvesen, fra symbolpakken «Trafikkskilt» i Geonorges symbolregister.
        </p>
      </section>
    </div>
  );
}
