import type { Licence } from "../scenarios/types";
import { useProgress, useStats } from "../state/progress";
import { EXAM_LENGTH, EXAM_MAX_ERRORS, EXAM_MINUTES, useGame } from "../state/store";

const LICENCES: { id: Licence; title: string; sub: string }[] = [
  { id: "B", title: "Bil", sub: "Klasse B" },
  { id: "A", title: "MC", sub: "Klasse A" },
];

/** Startskjerm: velg klasse, og så øving, prøve eller statistikk. */
export function Menu() {
  const { startPractice, startExam, setScreen } = useGame.getState();
  const licence = useProgress((s) => s.licence);
  const setLicence = useProgress((s) => s.setLicence);
  const { topics, scenariosPlayed: played } = useStats();
  const total = Object.values(topics).reduce((a, t) => a + (t?.total ?? 0), 0);
  const correct = Object.values(topics).reduce((a, t) => a + (t?.correct ?? 0), 0);

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
          <button className="menu-card" onClick={startPractice} autoFocus>
            <span className="menu-card-title">Øvingsmodus</span>
            <span>Forklaring etter hvert svar. Temaer du bommer på, kommer oftere.</span>
          </button>
          <button className="menu-card" onClick={startExam}>
            <span className="menu-card-title">Prøvemodus</span>
            <span>
              Som den ekte teoriprøven: {EXAM_LENGTH} spørsmål, maks {EXAM_MAX_ERRORS} feil og {EXAM_MINUTES} minutter.
              Resultat og forklaringer til slutt.
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
