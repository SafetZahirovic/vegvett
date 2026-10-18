import { EXAM_LENGTH, useExamComplete, useGame, useScenario, useScenarioDone } from "../state/store";
import { useProgress } from "../state/progress";

export function Hud() {
  const scenario = useScenario();
  const mode = useGame((s) => s.mode);
  const exam = useGame((s) => s.exam);
  const driving = useGame((s) => s.next !== null);
  const showAllRoutes = useGame((s) => s.showAllRoutes);
  const played = useProgress((s) => s.scenariosPlayed);
  const done = useScenarioDone();
  const examComplete = useExamComplete();
  const { resetView, advance, toggleAllRoutes, setScreen, finishExam } = useGame.getState();

  return (
    <>
      <header className="hud">
        <button className="hud-brand" onClick={() => setScreen("menu")} title="Til menyen">
          <span className="hud-logo">VEGVETT</span>
          <span className="hud-sub">Meny</span>
        </button>
        <div className="hud-actions">
          <label className="toggle">
            <input type="checkbox" checked={showAllRoutes} onChange={toggleAllRoutes} />
            <span>Vis alle kjøreretninger</span>
          </label>
          <button className="btn btn-ghost" onClick={resetView}>
            Sentrer på bilen
          </button>
        </div>
      </header>
      <footer className="titleblock">
        <div>
          <span className="tb-label">Modus</span>
          <span className="tb-value">{mode === "prove" ? "Prøve" : "Øving"}</span>
        </div>
        <div className="tb-main">
          <span className="tb-label">Scenario</span>
          <span className="tb-value">{driving ? "Kjører …" : scenario.title}</span>
        </div>
        <div>
          <span className="tb-label">{mode === "prove" ? "Besvart" : "Spilt"}</span>
          <span className="tb-value">{mode === "prove" && exam ? `${exam.log.length} / ${EXAM_LENGTH}` : played}</span>
        </div>
      </footer>
      <button
        className={`btn btn-next${done && !driving ? " is-ready" : ""}`}
        onClick={examComplete ? finishExam : advance}
        disabled={driving || !done}
        title={done ? undefined : "Svar på spørsmålene først"}
      >
        {examComplete ? "Se resultat →" : "Videre →"}
      </button>
    </>
  );
}
