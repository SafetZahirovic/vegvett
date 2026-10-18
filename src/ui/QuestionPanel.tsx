import { useEffect, useMemo, useRef, useState } from "react";
import type { Question, Scenario } from "../scenarios/types";
import { EXAM_LENGTH, useExamComplete, useGame, useScenario, type Answer, type AnswerValue } from "../state/store";
import { objectName } from "./labels";

/** Tilfeldig rekkefølge på svaralternativene, ny hver gang spørsmålet vises. */
function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function optionsFor(q: Question): { value: AnswerValue; label: string }[] {
  if (q.type === "yesno") {
    return [
      { value: true, label: "Ja" },
      { value: false, label: "Nei" },
    ];
  }
  if (q.type === "choice") return shuffled(q.options).map((o) => ({ value: o.id, label: o.text }));
  return [];
}

/** Fasit for spørsmål som besvares i tegningen. */
function SceneAnswer({ q, answer, scenario }: { q: Question; answer: Answer; scenario: Scenario }) {
  if (answer.correct) return null;
  if (q.type === "click") {
    return <p>Riktig svar: {objectName(scenario, q.correct)}.</p>;
  }
  if (q.type === "order") {
    return (
      <>
        <p className="order-label">Riktig rekkefølge:</p>
        <ol className="order-list">
          {q.correct.map((id) => (
            <li key={id}>{objectName(scenario, id)}</li>
          ))}
        </ol>
      </>
    );
  }
  return null;
}

function Feedback({ q, answer, scenario }: { q: Question; answer: Answer; scenario: Scenario }) {
  const [open, setOpen] = useState(false);
  if (answer.correct) {
    return (
      <div className="feedback is-correct" role="status">
        <strong>Riktig!</strong>
        {open ? (
          <p>{q.explanation}</p>
        ) : (
          <button className="link" onClick={() => setOpen(true)}>
            Vis forklaring
          </button>
        )}
        <p className="rule-ref">{q.rule}</p>
      </div>
    );
  }
  return (
    <div className="feedback is-wrong" role="status">
      <strong>Ikke riktig.</strong>
      <SceneAnswer q={q} answer={answer} scenario={scenario} />
      <p>{q.explanation}</p>
      <p className="rule-ref">{q.rule}</p>
      {q.highlight.length > 0 && <p className="feedback-hint">Det som gjelder her, er markert i tegningen.</p>}
    </div>
  );
}

/** Instruksjon og valg så langt for klikk-/rekkefølgespørsmål. */
function ScenePrompt({ q, scenario }: { q: Question; scenario: Scenario }) {
  const picks = useGame((s) => s.picks);
  const draft = useGame((s) => s.draft);
  const resetPicks = useGame((s) => s.resetPicks);
  if (q.type === "click") {
    return (
      <p className="scene-hint">
        {draft
          ? `Valgt: ${objectName(scenario, String(draft))}. Klikk på noe annet for å bytte.`
          : "Klikk på riktig objekt i tegningen."}
      </p>
    );
  }
  if (q.type !== "order") return null;
  return (
    <div className="scene-order">
      <p className="scene-hint">
        Klikk på kjøretøyene i den rekkefølgen de skal kjøre ({picks.length} / {q.correct.length}). Klikk på et
        valgt kjøretøy igjen for å ta det ut.
      </p>
      {picks.length > 0 && (
        <>
          <ol className="order-list">
            {picks.map((id) => (
              <li key={id}>{objectName(scenario, id)}</li>
            ))}
          </ol>
          <button className="link" onClick={resetPicks}>
            Begynn på nytt
          </button>
        </>
      )}
    </div>
  );
}

export function QuestionPanel() {
  const scenario = useScenario();
  const qIndex = useGame((s) => s.qIndex);
  const answers = useGame((s) => s.answers);
  const driving = useGame((s) => s.next !== null);
  const exam = useGame((s) => s.exam);
  const examComplete = useExamComplete();
  const isExam = !!exam;
  const draft = useGame((s) => s.draft);
  const picks = useGame((s) => s.picks);
  const { setDraft, submit, nextQuestion, advance, finishExam } = useGame.getState();

  const q = scenario.questions[qIndex] as Question | undefined;
  const options = useMemo(() => (q ? optionsFor(q) : []), [q]);
  const given = q ? answers[q.id] : undefined;
  const actions = useRef<HTMLDivElement>(null);
  // Sørg for at forklaring og «Neste» er synlig når panelet er lavt.
  useEffect(() => {
    if (given) actions.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [given]);
  const isLast = qIndex === scenario.questions.length - 1;

  // Klar til å sende: et valgt alternativ, eller hele rekkefølgen.
  const ready = q?.type === "order" ? picks.length === q.correct.length : draft !== null;

  // Hurtigtaster: 1–4 / A–D velger svar, J/N for ja/nei, Enter sender svaret eller går videre.
  useEffect(() => {
    if (driving || !q) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).tagName === "INPUT") return;
      const key = e.key.toLowerCase();
      if (!given) {
        const i = "1234".indexOf(key) >= 0 ? "1234".indexOf(key) : "abcd".indexOf(key);
        if (q.type === "yesno" && (key === "j" || key === "n")) return setDraft(key === "j");
        if (i >= 0 && options[i]) return setDraft(options[i].value);
        if (key === "enter" && ready) {
          e.preventDefault();
          submit();
        }
        return;
      }
      if (key !== "enter") return;
      e.preventDefault();
      if (examComplete) finishExam();
      else if (!isLast) nextQuestion();
      else advance();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, given, options, isLast, examComplete, driving, ready]);

  if (driving || !q) return null;

  const correctCount = scenario.questions.filter((x) => answers[x.id]?.correct).length;

  return (
    <section className="panel question" aria-label="Spørsmål" key={q.id}>
      <div className="question-head">
        <span>
          {isExam
            ? `Prøve · spørsmål ${Math.min(EXAM_LENGTH, exam.log.length + (given ? 0 : 1))} / ${EXAM_LENGTH}`
            : `Spørsmål ${qIndex + 1} / ${scenario.questions.length}`}
        </span>
        <span className="question-dots" aria-hidden>
          {scenario.questions.map((x, i) => (
            <i
              key={x.id}
              className={
                answers[x.id]
                  ? isExam
                    ? "done"
                    : answers[x.id].correct
                      ? "ok"
                      : "bad"
                  : i === qIndex
                    ? "now"
                    : ""
              }
            />
          ))}
        </span>
      </div>
      <h2>{q.prompt}</h2>
      {options.length > 0 && (
        <div className={`options${q.type === "yesno" ? " is-yesno" : ""}`}>
          {options.map((o, i) => {
            const chosen = given?.value === o.value;
            const state = !given
              ? draft === o.value
                ? " is-chosen"
                : ""
              : isExam
                ? chosen
                  ? " is-chosen"
                  : " is-dim"
                : o.value === q.correct
                  ? " is-correct"
                  : chosen
                    ? " is-wrong"
                    : " is-dim";
            return (
              <button
                key={String(o.value)}
                className={`option${state}`}
                disabled={!!given}
                aria-pressed={!given && draft === o.value}
                onClick={() => setDraft(o.value)}
              >
                {q.type === "choice" && <span className="option-key">{String.fromCharCode(65 + i)}</span>}
                <span>{o.label}</span>
              </button>
            );
          })}
        </div>
      )}
      {!given && <ScenePrompt q={q} scenario={scenario} />}
      {!given && (
        <button className="btn btn-primary btn-submit" onClick={submit} disabled={!ready}>
          Svar
        </button>
      )}
      {given &&
        (isExam ? (
          <p className="scene-hint">Svaret er registrert. Du får se fasit og forklaring når prøven er ferdig.</p>
        ) : (
          <Feedback q={q} answer={given} scenario={scenario} />
        ))}
      <div ref={actions}>
        {given &&
          (examComplete ? (
            <button className="btn btn-primary" onClick={finishExam}>
              Se resultat
            </button>
          ) : isLast ? (
            <div className="question-done">
              {!isExam && (
                <span>
                  {correctCount} av {scenario.questions.length} riktige
                </span>
              )}
              <span>Trykk «Videre» (eller Enter) for å kjøre videre.</span>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={nextQuestion}>
              Neste spørsmål
            </button>
          ))}
      </div>
    </section>
  );
}
