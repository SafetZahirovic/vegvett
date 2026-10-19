import { useEffect, useState } from "react";
import { EXAM_LENGTH, EXAM_MINUTES, useExamComplete, useGame, useScenario, useScenarioDone } from "../state/store";
import { useProgress, useStats } from "../state/progress";

/** Nedtelling på prøven. Avslutter prøven når tiden er ute. */
function ExamClock({ startedAt }: { startedAt: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = Math.max(0, EXAM_MINUTES * 60 - Math.floor((now - startedAt) / 1000));
  useEffect(() => {
    if (left === 0) useGame.getState().finishExam(true);
  }, [left]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className={left < 5 * 60 ? "is-short" : undefined}>
      <span className="tb-label">Tid igjen</span>
      <span className="tb-value">
        {mm}:{ss}
      </span>
    </div>
  );
}

export function Hud() {
  const scenario = useScenario();
  const mode = useGame((s) => s.mode);
  const exam = useGame((s) => s.exam);
  const driving = useGame((s) => s.next !== null);
  const showAllRoutes = useGame((s) => s.showAllRoutes);
  const played = useStats().scenariosPlayed;
  const licence = useProgress((s) => s.licence);
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
          <span className="tb-value">
            {licence === "A" ? "MC" : "Bil"} · {mode === "prove" ? "Prøve" : "Øving"}
          </span>
        </div>
        <div className="tb-main">
          <span className="tb-label">Scenario</span>
          <span className="tb-value">{driving ? "Kjører …" : scenario.title}</span>
        </div>
        <div>
          <span className="tb-label">{mode === "prove" ? "Besvart" : "Spilt"}</span>
          <span className="tb-value">{mode === "prove" && exam ? `${exam.log.length} / ${EXAM_LENGTH}` : played}</span>
        </div>
        {mode === "prove" && exam && <ExamClock startedAt={exam.startedAt} />}
      </footer>
      <button
        className={`btn btn-next${done && !driving ? " is-ready" : ""}`}
        onClick={examComplete ? () => finishExam() : advance}
        disabled={driving || !done}
        title={done ? undefined : "Svar på spørsmålene først"}
      >
        {examComplete ? "Se resultat →" : "Videre →"}
      </button>
    </>
  );
}
