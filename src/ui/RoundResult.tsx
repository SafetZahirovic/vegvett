import { categoryById } from "../state/categories";
import { useGame } from "../state/store";
import { ResultList } from "./ExamResult";

/** Oppsummering etter en runde i én kategori (øving) eller etter guidet kjøring. */
export function RoundResult() {
  const round = useGame((s) => s.round);
  const mode = useGame((s) => s.mode);
  const { startPractice, startGuide, startExam, setScreen } = useGame.getState();
  if (!round) return null;
  const category = categoryById(round.category);
  const correct = round.log.filter((e) => e.correct).length;
  const guide = mode === "guide";

  return (
    <div className="overlay">
      <section className="sheet result" aria-label="Oppsummering">
        <p className="sheet-kicker">
          {guide ? "Guiden er ferdig" : "Runden er ferdig"}
          {category ? ` · ${category.title}` : ""}
        </p>
        {guide ? (
          <h1 className="result-score">
            {round.order.length} <span>situasjoner</span>
          </h1>
        ) : (
          <h1 className="result-score">
            {correct} <span>av {round.log.length} riktige</span>
          </h1>
        )}
        <p className="sheet-lead">
          {guide
            ? "Du har sett gjennom alle situasjonene i kategorien. Prøv deg selv i øvingsmodus eller ta en prøve."
            : "Du har vært gjennom alle scenarioene i kategorien. Gå gjennom forklaringene under, særlig der du svarte feil."}
        </p>
        {!guide && <ResultList log={round.log} />}
        <div className="menu-footer">
          <button className="btn btn-primary" onClick={startPractice}>
            {guide ? "Øv på dette" : "Ny runde"}
          </button>
          <button className="btn btn-ghost" onClick={guide ? startGuide : startExam}>
            {guide ? "Se guiden igjen" : "Ta en prøve"}
          </button>
          <button className="link" onClick={() => setScreen("menu")}>
            Meny
          </button>
        </div>
      </section>
    </div>
  );
}
