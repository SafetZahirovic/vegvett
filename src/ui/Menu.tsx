import { EXAM_LENGTH, useGame } from "../state/store";
import { useProgress } from "../state/progress";

/** Startskjerm: velg øving, prøve eller statistikk. */
export function Menu() {
  const { startPractice, startExam, setScreen } = useGame.getState();
  const topics = useProgress((s) => s.topics);
  const played = useProgress((s) => s.scenariosPlayed);
  const total = Object.values(topics).reduce((a, t) => a + (t?.total ?? 0), 0);
  const correct = Object.values(topics).reduce((a, t) => a + (t?.correct ?? 0), 0);

  return (
    <div className="overlay">
      <section className="sheet menu" aria-label="Meny">
        <p className="sheet-kicker">Teoriprøven klasse B</p>
        <h1>VEGVETT</h1>
        <p className="sheet-lead">
          Lær trafikkreglene i en tegning. Utforsk krysset, klikk på skilt og kjøretøy, og svar på spørsmålene.
        </p>
        <div className="menu-actions">
          <button className="menu-card" onClick={startPractice} autoFocus>
            <span className="menu-card-title">Øvingsmodus</span>
            <span>Forklaring etter hvert svar. Temaer du bommer på, kommer oftere.</span>
          </button>
          <button className="menu-card" onClick={startExam}>
            <span className="menu-card-title">Prøvemodus</span>
            <span>{EXAM_LENGTH} spørsmål uten hjelp underveis. Du får resultat og forklaringer til slutt.</span>
          </button>
        </div>
        <div className="menu-footer">
          <span>
            {played > 0
              ? `${played} scenarioer spilt · ${total ? Math.round((correct / total) * 100) : 0} % riktige`
              : "Ingen fremgang lagret ennå"}
          </span>
          <button className="link" onClick={() => setScreen("stats")}>
            Statistikk
          </button>
        </div>
      </section>
    </div>
  );
}
