import { SCENARIOS } from "../scenarios";
import { categoryById } from "../state/categories";
import { useGame } from "../state/store";
import type { ExamEntry } from "../state/store";
import { answerLabel } from "./labels";

/** Resultat etter prøvemodus, med forklaring på alle spørsmål. */
export function ExamResult() {
  const exam = useGame((s) => s.exam);
  const { startExam, startPractice, setScreen } = useGame.getState();
  if (!exam) return null;
  const correct = exam.log.filter((e) => e.correct).length;
  const total = exam.length;
  const unanswered = total - exam.log.length;
  const errors = total - correct;
  const passed = errors <= exam.maxErrors;
  const category = categoryById(exam.category);

  return (
    <div className="overlay">
      <section className="sheet result" aria-label="Resultat">
        <p className="sheet-kicker">Resultat{category ? ` · ${category.title}` : ""}</p>
        <h1 className="result-score">
          {correct} <span>av {total}</span>
        </h1>
        <p className={`result-verdict${passed ? " is-pass" : " is-fail"}`}>
          {passed ? "Bestått" : "Ikke bestått"} – {errors} feil (maks {exam.maxErrors})
        </p>
        <p className="sheet-lead">
          {exam.timedOut && "Tiden gikk ut. "}
          {unanswered > 0 && `${unanswered} ubesvarte spørsmål teller som feil. `}
          Gå gjennom forklaringene under – særlig der du svarte feil.
        </p>
        <ResultList log={exam.log} />
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

/** Liste over besvarte spørsmål med fasit og forklaring der svaret var feil. */
export function ResultList({ log }: { log: ExamEntry[] }) {
  return (
    <ol className="result-list">
      {log.map((e) => {
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
  );
}
