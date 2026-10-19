import type { Licence } from "../scenarios/types";
import { useProgress, useStats } from "../state/progress";
import { useState } from "react";
import { CATEGORIES, categoryCount } from "../state/categories";
import { shuffledScenarioOrder } from "../state/selection";
import { EXAM_LENGTH, EXAM_MAX_ERRORS, EXAM_MINUTES, examFormat, useGame } from "../state/store";

const LICENCES: { id: Licence; title: string; sub: string }[] = [
  { id: "B", title: "Bil", sub: "Klasse B" },
  { id: "A", title: "MC", sub: "Klasse A" },
];

type ModeChoice = "guide" | "ovelse" | "prove";

const MODE_TITLE: Record<ModeChoice, string> = {
  guide: "Guidet kjøring",
  ovelse: "Øvingsmodus",
  prove: "Prøvemodus",
};

/** Kort beskrivelse av hva du får i en kategori (null = alle) i valgt modus. */
function categoryDetail(mode: ModeChoice, category: string | null, licence: Licence): string {
  const count = categoryCount(category, licence);
  if (mode === "guide") return `${count} situasjoner`;
  if (mode === "ovelse") return category === null ? "Så lenge du vil" : `Runde med ${count} scenarioer`;
  const exam = examFormat(shuffledScenarioOrder({}, licence, category));
  return `${exam.length} spørsmål · maks ${exam.maxErrors} feil · ${exam.minutes} min`;
}

/** Andre steg i menyen: velg kategori (eller alle) for modusen du valgte. */
function CategoryStep({ mode, onBack }: { mode: ModeChoice; onBack: () => void }) {
  const { startPractice, startExam, startGuide, setCategory } = useGame.getState();
  const licence = useProgress((s) => s.licence);
  const categories = CATEGORIES.filter((c) => categoryCount(c.id, licence) > 0);
  const start = (category: string | null) => {
    setCategory(category);
    ({ guide: startGuide, ovelse: startPractice, prove: startExam })[mode]();
  };
  const options = [{ id: null, title: "Alle kategorier" }, ...categories];

  return (
    <div className="overlay">
      <section className="sheet menu" aria-label={`${MODE_TITLE[mode]}: velg kategori`}>
        <button className="link category-back" onClick={onBack}>
          ← Tilbake
        </button>
        <p className="sheet-kicker">{MODE_TITLE[mode]}</p>
        <h2 className="category-heading">Velg kategori</h2>
        <div className="category-list">
          {options.map((c, i) => (
            <button
              key={c.id ?? "alle"}
              className={`category-option${c.id === null ? " is-all" : ""}`}
              onClick={() => start(c.id)}
              autoFocus={i === 0}
            >
              <span className="category-option-title">{c.title}</span>
              <span className="category-option-detail">{categoryDetail(mode, c.id, licence)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/** Startskjerm: velg klasse og modus, og deretter kategori. */
export function Menu() {
  const { setScreen } = useGame.getState();
  const [mode, setMode] = useState<ModeChoice | null>(null);
  const licence = useProgress((s) => s.licence);
  const setLicence = useProgress((s) => s.setLicence);
  const { topics, scenariosPlayed: played } = useStats();
  const total = Object.values(topics).reduce((a, t) => a + (t?.total ?? 0), 0);
  const correct = Object.values(topics).reduce((a, t) => a + (t?.correct ?? 0), 0);

  if (mode) return <CategoryStep mode={mode} onBack={() => setMode(null)} />;

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
        <div className="menu-actions">
          <button className="menu-card" onClick={() => setMode("guide")}>
            <span className="menu-card-title">Guidet kjøring</span>
            <span>Bilen kjører selv og forteller hva du skal gjøre. Automatisk eller ett steg om gangen.</span>
          </button>
          <button className="menu-card" onClick={() => setMode("ovelse")} autoFocus>
            <span className="menu-card-title">Øvingsmodus</span>
            <span>Forklaring etter hvert svar. Temaer du bommer på, kommer oftere.</span>
          </button>
          <button className="menu-card" onClick={() => setMode("prove")}>
            <span className="menu-card-title">Prøvemodus</span>
            <span>
              Som den ekte teoriprøven: {EXAM_LENGTH} spørsmål, maks {EXAM_MAX_ERRORS} feil og {EXAM_MINUTES} minutter.
              Kortere prøve i én kategori.
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
