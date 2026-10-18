import { SCENARIOS } from "../scenarios";
import { useGame } from "../state/store";
import { answerLabel } from "./labels";

/** Resultat etter prøvemodus, med forklaring på alle spørsmål. */
export function ExamResult() {
  const exam = useGame((s) => s.exam);
  const { startExam, startPractice, setScreen } = useGame.getState();
  if (!exam) return null;
  const correct = exam.log.filter((e) => e.correct).length;
  const total = exam.log.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="overlay">
      <section className="sheet result" aria-label="Resultat">
        <p className="sheet-kicker">Resultat</p>
        <h1 className="result-score">
          {correct} <span>av {total}</span>
        </h1>
        <p className="sheet-lead">{pct} % riktige. Gå gjennom forklaringene under – særlig der du svarte feil.</p>
        <ol className="result-list">
          {exam.log.map((e) => {
            const scenario = SCENARIOS.find((s) => s.id === e.scenarioId)!;
            const q = scenario.questions.find((x) => x.id === e.questionId)!;
            return (
              <li key={`${e.scenarioId}:${e.questionId}`} className={e.correct ? "is-correct" : "is-wrong"}>
                <div className="result-q">
                  <span className="result-mark" aria-label={e.correct ? "Riktig" : "Feil"}>
                    {e.correct ? "✓" : "✗"}
                  </span>
                  <div>
                    <span className="result-scenario">{scenario.title}</span>
                    <strong>{q.prompt}</strong>
                  </div>
                </div>
                <p>
                  Ditt svar: {answerLabel(scenario, q, e.value)}
                  {!e.correct && (
                    <>
                      <br />
                      Riktig svar: {answerLabel(scenario, q, q.correct)}
                    </>
                  )}
                </p>
                {!e.correct && <p className="result-expl">{q.explanation}</p>}
                <p className="rule-ref">{q.rule}</p>
              </li>
            );
          })}
        </ol>
        <div className="menu-footer">
          <button className="btn btn-primary" onClick={startExam}>
            Ny prøve
          </button>
          <button className="btn btn-ghost" onClick={startPractice}>
            Øvingsmodus
          </button>
          <button className="link" onClick={() => setScreen("menu")}>
            Meny
          </button>
        </div>
      </section>
    </div>
  );
}
