import { useEffect } from "react";
import type { Question } from "../scenarios/types";
import { useActiveQuestions, useGame, useScenario } from "../state/store";
import { answerLabel } from "./labels";
import { ReadMore } from "./QuestionPanel";

/** Lesetid for et steg i automatisk kjøring: litt tid per tegn, innenfor rimelige grenser. */
function readingTime(q: Question): number {
  const chars = q.prompt.length + q.explanation.length;
  return Math.min(18000, Math.max(6000, 3000 + chars * 45));
}

/**
 * Spørsmålsteksten skrevet om til en forklaring: i guiden klikker du ikke selv,
 * så «Klikk på bilen …» blir «Se på bilen …».
 */
export function guidePrompt(prompt: string): string {
  return prompt
    .replace(/\s*Klikk( på plasseringen)?\.$/, "")
    .replace(/(Klikk|Sett) kjøretøyene i (den|riktig) rekkefølge(n)?( de skal kjøre)?( gjennom krysset)?\./, "Se rekkefølgen kjøretøyene skal kjøre i.")
    .replace(/Klikk der /, "Se hvor ")
    .replace(/Klikk på /, "Se på ");
}

/** Overskrift for fasiten, etter spørsmålstype. */
const ANSWER_LABEL: Record<Question["type"], string> = {
  choice: "Svar",
  yesno: "Svar",
  click: "Her",
  order: "Rekkefølge",
};

/** Det som skal fremheves i tegningen for et steg: det spørsmålet peker på, og fasiten i klikkspørsmål. */
function stepHighlight(q: Question): string[] {
  const ids = [...q.highlight];
  if (q.type === "click") ids.push(q.correct);
  if (q.type === "order") ids.push(...q.correct);
  return [...new Set(ids)];
}

/** Guidet kjøring: bilen stopper ved hver situasjon, forklarer hva som gjelder, og kjører videre. */
export function GuidePanel() {
  const scenario = useScenario();
  const questions = useActiveQuestions();
  const step = useGame((s) => s.qIndex);
  const driving = useGame((s) => s.next !== null);
  const autoDrive = useGame((s) => s.autoDrive);
  const round = useGame((s) => s.round);
  const { toggleAutoDrive, nextQuestion, advance } = useGame.getState();

  const q = questions[step] as Question | undefined;
  const isLast = step >= questions.length - 1;
  const lastScenario = !!round && round.pos + 1 >= round.order.length;
  const forward = () => (isLast ? advance() : nextQuestion());
  const back = () => useGame.setState({ qIndex: Math.max(0, step - 1) });

  // Marker det som gjelder i dette steget, og flytt kartet dit.
  useEffect(() => {
    if (driving || !q) return;
    const highlight = stepHighlight(q);
    useGame.setState((s) => ({
      highlight,
      focusToken: highlight.length ? s.focusToken + 1 : s.focusToken,
    }));
  }, [q, driving]);

  // Automatisk kjøring: gå videre når lesetiden er ute.
  useEffect(() => {
    if (!autoDrive || driving || !q) return;
    const id = setTimeout(forward, readingTime(q));
    return () => clearTimeout(id);
  }, [autoDrive, driving, q, isLast]);

  // Hurtigtaster: Enter / pil høyre = videre, pil venstre = tilbake, mellomrom = av/på automatisk.
  useEffect(() => {
    if (driving) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        forward();
      } else if (e.key === "ArrowLeft") {
        back();
      } else if (e.key === " ") {
        e.preventDefault();
        toggleAutoDrive();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [driving, step, isLast]);

  const toggle = (
    <label className="toggle guide-toggle">
      <input type="checkbox" checked={autoDrive} onChange={toggleAutoDrive} />
      <span>Kjør automatisk</span>
    </label>
  );

  if (driving || !q) {
    return (
      <section className="panel question guide" aria-label="Guide">
        <div className="question-head">
          <span>Guide</span>
        </div>
        <p className="guide-driving">Bilen kjører til neste situasjon …</p>
        {toggle}
      </section>
    );
  }

  return (
    <section className="panel question guide" aria-label="Guide" key={`${scenario.id}:${q.id}`}>
      <div className="question-head">
        <span>
          Guide · {scenario.title} · {step + 1} / {questions.length}
        </span>
      </div>
      <p className="guide-label">Spørsmålet</p>
      <h2>{guidePrompt(q.prompt)}</h2>
      <div className="feedback is-correct guide-answer">
        <strong>
          {ANSWER_LABEL[q.type]}: {answerLabel(scenario, q, q.correct)}
        </strong>
        <p>{q.explanation}</p>
        <p className="rule-ref">{q.rule}</p>
        {stepHighlight(q).length > 0 && <p className="feedback-hint">Det som gjelder her, er markert i tegningen.</p>}
        <ReadMore scenario={scenario} />
      </div>
      {autoDrive && <div className="guide-timer" key={`t-${q.id}`} style={{ animationDuration: `${readingTime(q)}ms` }} />}
      <div className="guide-actions">
        <button className="btn btn-ghost" onClick={back} disabled={step === 0}>
          ← Tilbake
        </button>
        <button className="btn btn-primary" onClick={forward}>
          {!isLast ? "Neste →" : lastScenario ? "Avslutt guiden →" : "Kjør videre →"}
        </button>
      </div>
      {toggle}
    </section>
  );
}
