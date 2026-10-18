import { useState } from "react";
import type { Topic } from "../scenarios/types";
import { useGame } from "../state/store";
import { useProgress } from "../state/progress";
import { TOPIC_LABEL } from "./labels";

/** Riktig-prosent per tema, antall scenarioer og tidligere prøver. */
export function Stats() {
  const { topics, scenariosPlayed, exams, reset } = useProgress();
  const setScreen = useGame((s) => s.setScreen);
  const [confirm, setConfirm] = useState(false);
  const rows = (Object.keys(TOPIC_LABEL) as Topic[]).map((t) => ({ topic: t, stat: topics[t] }));
  const total = rows.reduce((a, r) => a + (r.stat?.total ?? 0), 0);
  const correct = rows.reduce((a, r) => a + (r.stat?.correct ?? 0), 0);

  return (
    <div className="overlay">
      <section className="sheet stats" aria-label="Statistikk">
        <button className="panel-close" onClick={() => setScreen("menu")} aria-label="Lukk">
          ×
        </button>
        <p className="sheet-kicker">Statistikk</p>
        <div className="stat-summary">
          <div>
            <span className="tb-label">Scenarioer</span>
            <span className="stat-big">{scenariosPlayed}</span>
          </div>
          <div>
            <span className="tb-label">Spørsmål</span>
            <span className="stat-big">{total}</span>
          </div>
          <div>
            <span className="tb-label">Riktige</span>
            <span className="stat-big">{total ? `${Math.round((correct / total) * 100)} %` : "–"}</span>
          </div>
        </div>
        <h2>Per tema</h2>
        <ul className="topic-list">
          {rows.map(({ topic, stat }) => {
            const pct = stat && stat.total ? Math.round((stat.correct / stat.total) * 100) : null;
            return (
              <li key={topic}>
                <span>{TOPIC_LABEL[topic]}</span>
                <span className="bar" aria-hidden>
                  <i style={{ width: `${pct ?? 0}%` }} className={pct !== null && pct < 70 ? "is-low" : ""} />
                </span>
                <span className="topic-pct">{pct === null ? "–" : `${pct} %`}</span>
                <span className="topic-n">{stat?.total ?? 0} sp.</span>
              </li>
            );
          })}
        </ul>
        {exams.length > 0 && (
          <>
            <h2>Siste prøver</h2>
            <ul className="exam-list">
              {exams
                .slice(-5)
                .reverse()
                .map((e) => (
                  <li key={e.date}>
                    <span>{new Date(e.date).toLocaleDateString("nb-NO", { day: "numeric", month: "short" })}</span>
                    <span>
                      {e.correct} av {e.total}
                    </span>
                  </li>
                ))}
            </ul>
          </>
        )}
        <div className="menu-footer">
          <button className="btn btn-ghost" onClick={() => setScreen("menu")}>
            Tilbake
          </button>
          <button
            className="link danger"
            onClick={() => {
              if (!confirm) return setConfirm(true);
              reset();
              setConfirm(false);
            }}
          >
            {confirm ? "Trykk igjen for å slette all fremgang" : "Nullstill fremgang"}
          </button>
        </div>
      </section>
    </div>
  );
}
