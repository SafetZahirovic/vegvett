# Vegvett

Nettleserspill for teoriprøven klasse B. Trafikkreglene vises som en isometrisk «blueprint»-tegning,
der veien glir under bilen som et transportbånd mellom scenarioene.

```bash
npm install
npm run dev
```

- `npm run typecheck` – TypeScript-sjekk
- `npm run build` – produksjonsbygg
- `?ark=7` i adressen starter direkte på scenario nr. 7 (sortert etter vanskelighetsgrad og tittel) og hopper over menyen.

## Moduser
- **Øvingsmodus:** forklaring etter hvert svar. Scenarioer velges tilfeldig, men oftere fra temaer du har svart feil på.
- **Prøvemodus:** 20 spørsmål uten tilbakemelding underveis. Du får resultat med forklaringer til slutt.
- Fremgangen (riktig-prosent per tema, antall scenarioer og prøveresultater) lagres i `localStorage`.

Hurtigtaster: `1–4` eller `A–D` velger svar, `J`/`N` svarer ja/nei, og `Enter` går videre.

## Struktur
- `src/scenarios/` – én datafil per scenario (hentes automatisk), pluss rutehjelpere (`routes.ts`)
- `src/signs/` – skiltregister med skiltkode, navn, kategori, forklaring og tegnefunksjon
- `src/scene/` – SVG-tegning: isometri, vei, figurer, rutepiler og transportbånd
- `src/ui/` – paneler og skjermer
- `src/state/` – spilltilstand, fremgang og vektet utvalg

## Nytt scenario
1. Kopier en fil i `src/scenarios/` som ligner (f.eks. `gangfelt.ts`).
2. Endre id, veitype, skilt, oppmerking, kjøretøy og spørsmål.
3. Ferdig – filen blir plukket opp automatisk. Før opp regelpåstandene i `CONTENT_REVIEW.md`.
