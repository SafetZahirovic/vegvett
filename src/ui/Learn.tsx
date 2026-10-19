import { useEffect, useRef } from "react";
import { ARTICLES, GROUP_ORDER, articlesFor } from "../learning";
import { SCENARIOS } from "../scenarios";
import { forLicence } from "../state/selection";
import { useProgress } from "../state/progress";
import { useGame } from "../state/store";

/** Læringsdelen: oversikt over temaer og egne lesesider. */
export function Learn() {
  const licence = useProgress((s) => s.licence);
  const articleId = useGame((s) => s.articleId);
  const { openArticle, closeLearn, practiceTopic } = useGame.getState();
  const sheet = useRef<HTMLElement>(null);
  useEffect(() => {
    sheet.current?.scrollTo({ top: 0 });
  }, [articleId]);

  const article = articleId ? ARTICLES.find((a) => a.id === articleId) : null;
  const list = articlesFor(licence);
  const practicable =
    article?.topics?.some((t) => SCENARIOS.some((s) => s.topic === t && forLicence(s, licence))) ?? false;

  return (
    <div className="overlay">
      <section className="sheet learn" aria-label="Læring" ref={sheet}>
        <button className="panel-close" onClick={closeLearn} aria-label="Lukk">
          ×
        </button>
        {article ? (
          <article className="article">
            <button className="link" onClick={() => openArticle(null)}>
              ← Alle temaer
            </button>
            <p className="sheet-kicker">{article.group}</p>
            <h1 className="article-title">{article.title}</h1>
            <p className="sheet-lead">{article.intro}</p>
            {article.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.text && <p>{s.text}</p>}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <h2>Kilder</h2>
            <ul className="article-sources">
              {article.sources.map((src) => (
                <li key={src.label}>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noreferrer">
                      {src.label}
                    </a>
                  ) : (
                    src.label
                  )}
                </li>
              ))}
            </ul>
            <div className="menu-footer">
              {practicable && article.topics && (
                <button className="btn btn-primary" onClick={() => practiceTopic(article.topics![0])}>
                  Øv på dette i tegningen
                </button>
              )}
              <button className="link" onClick={() => openArticle(null)}>
                Alle temaer
              </button>
            </div>
          </article>
        ) : (
          <>
            <p className="sheet-kicker">Læring</p>
            <p className="sheet-lead">
              Korte forklaringer per tema, skrevet for Vegvett og bygd på trafikkreglene og Statens vegvesens
              materiell. Temaene følger Statens vegvesens temaliste for teoriprøven.
            </p>
            {GROUP_ORDER.map((group) => {
              const items = list.filter((a) => a.group === group);
              if (!items.length) return null;
              return (
                <div key={group}>
                  <h2>{group}</h2>
                  <ul className="article-list">
                    {items.map((a) => (
                      <li key={a.id}>
                        <button className="article-link" onClick={() => openArticle(a.id)}>
                          <strong>{a.title}</strong>
                          <span>{a.intro}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </>
        )}
      </section>
    </div>
  );
}
