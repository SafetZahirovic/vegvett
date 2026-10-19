import type { Licence } from "../scenarios/types";
import { useProgress, useStats } from "../state/progress";
import { useMemo } from "react";
import { CATEGORIES, categoryCount } from "../state/categories";
import { shuffledScenarioOrder } from "../state/selection";
import { examFormat, useGame } from "../state/store";

const LICENCES: { id: Licence; title: string; sub: string }[] = [
  { id: "B", title: "Bil", sub: "Klasse B" },
  { id: "A", title: "MC", sub: "Klasse A" },
];

/** Startskjerm: velg klasse, og så øving, prøve eller statistikk. */
export function Menu() {
  const { startPractice, startExam, startGuide, setScreen, setCategory } = useGame.getState();
  const category = useGame((s) => s.category);
  const licence = useProgress((s) => s.licence);
  const setLicence = useProgress((s) => s.setLicence);
  const { topics, scenariosPlayed: played } = useStats();
  const total = Object.values(topics).reduce((a, t) => a + (t?.total ?? 0), 0);
  const correct = Object.values(topics).reduce((a, t) => a + (t?.correct ?? 0), 0);
  const categories = CATEGORIES.map((c) => ({ ...c, count: categoryCount(c.id, licence) })).filter((c) => c.count > 0);
  // Valgt kategori finnes kanskje ikke for den andre klassen (f.eks. Motorsykkel for bil).
  const active = categories.some((c) => c.id === category) ? category : null;
  const count = categoryCount(active, licence);
  const exam = useMemo(() => examFormat(shuffledScenarioOrder({}, licence, active)), [licence, active]);
  const start = (fn: () => void) => () => {
    if (active !== category) setCategory(active);
    fn();
  };

  return (
    <div className="overlay">
      <section className="sheet menu" aria-label="Meny">
        <p className="sheet-kicker">Teoriprøven</p>
        <h1>VEGVETT</h1>
        <p className="sheet-lead">
          Lær trafikkreglene i en tegning. Utforsk krysset, klikk på skilt og kjøretøy, og svar på spørsmålene.
        </p>
        <div className="licence-switch" role="radiogroup" aria-label="Førerkortklasse">
          {LICENCES.map((l) => (
            <button
              key={l.id}
              role="radio"
              aria-checked={licence === l.id}
              className={`licence${licence === l.id ? " is-active" : ""}`}
              onClick={() => setLicence(l.id)}
            >
              <span className="licence-title">{l.title}</span>
              <span className="licence-sub">{l.sub}</span>
            </button>
          ))}
        </div>
        <div className="category-picker" role="radiogroup" aria-label="Kategori">
          <span className="category-label">Kategori</span>
          <div className="category-chips">
            <button
              role="radio"
              aria-checked={active === null}
              className={`chip${active === null ? " is-active" : ""}`}
              onClick={() => setCategory(null)}
            >
              Alle
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                role="radio"
                aria-checked={active === c.id}
                className={`chip${active === c.id ? " is-active" : ""}`}
                onClick={() => setCategory(c.id)}
              >
                {c.title} <span className="chip-count">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="menu-actions">
          <button className="menu-card" onClick={start(startGuide)}>
            <span className="menu-card-title">Guidet kjøring</span>
            <span>
              Bilen kjører selv gjennom {count} situasjoner og forteller hva du skal gjøre. Automatisk eller ett steg
              om gangen.
            </span>
          </button>
          <button className="menu-card" onClick={start(startPractice)} autoFocus>
            <span className="menu-card-title">Øvingsmodus</span>
            <span>
              {active === null
                ? "Forklaring etter hvert svar. Fortsetter så lenge du vil, og temaer du bommer på, kommer oftere."
                : `En runde gjennom kategoriens ${count} scenarioer, med forklaring etter hvert svar og oppsummering til slutt.`}
            </span>
          </button>
          <button className="menu-card" onClick={start(startExam)}>
            <span className="menu-card-title">Prøvemodus</span>
            <span>
              {active === null ? "Som den ekte teoriprøven: " : "Prøve i kategorien: "}
              {exam.length} spørsmål, maks {exam.maxErrors} feil og {exam.minutes} minutter. Resultat og forklaringer
              til slutt.
            </span>
          </button>
        </div>
        <div className="menu-footer">
          <span>
            {played > 0
              ? `${played} scenarioer spilt · ${total ? Math.round((correct / total) * 100) : 0} % riktige`
              : "Ingen fremgang lagret ennå"}
          </span>
          <span className="menu-links">
            <button className="link" onClick={() => setScreen("learn")}>
              Læring
            </button>
            <button className="link" onClick={() => setScreen("signs")}>
              Skiltoversikt
            </button>
            <button className="link" onClick={() => setScreen("stats")}>
              Statistikk
            </button>
          </span>
        </div>
      </section>
    </div>
  );
}
