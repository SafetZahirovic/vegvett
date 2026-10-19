# Vegvett

Nettleserspill for teoriprøven klasse B. Trafikkreglene vises som en isometrisk «blueprint»-tegning,
der veien glir under bilen som et transportbånd mellom scenarioene.

## Om spillet

Vegvett lærer deg norske trafikkregler gjennom korte situasjoner på en sammenhengende kjøretur.
Du styrer ikke bilen. I stedet utforsker du tegningen: panorer og zoom, og klikk på skilt, kjøretøy
og fotgjengere for å se hva de betyr og hvor de skal kjøre. Deretter svarer du på 1–3 spørsmål.
Svarer du feil, får du en kort forklaring med henvisning til regelen, og det som gjelder, blir
markert i tegningen.

Spillet har to klasser, bil (B) og MC (A), med til sammen 81 scenarioer og 264 spørsmål (inntil tre trekkes tilfeldig per besøk), bruker Statens vegvesens offisielle skiltbilder, og har en skiltoversikt med alle 329 skiltene. Det dekker blant annet vikeplikt og høyreregelen,
forkjørsveg, stopp, rundkjøring, gangfelt, gang- og sykkelveg, buss ved holdeplass, utrykningskjøretøy,
sperre- og varsellinje, forbikjøring, møteplikt, vegarbeid, motorveg, parkering og stans, fartsgrenser,
fareskilt og dyr i vegen (elg, rein og sau). Mellom scenarioene kjører bilen ruten sin: den svinger i
kryss og kjører rundt i rundkjøringen, og neste scenario fortsetter i den retningen bilen kom ut.
Det finnes fire typer spørsmål: flervalg, ja/nei, klikk i tegningen og rekkefølge gjennom krysset.

Spillet er laget for å øve, og det erstatter ikke offisielt læremateriell. Regelpåstandene står samlet i
[CONTENT_REVIEW.md](CONTENT_REVIEW.md), slik at de kan kontrolleres mot trafikkreglene og
Statens vegvesens materiell.

## Kom i gang

```bash
npm install
npm run dev
```

- `npm run typecheck` – TypeScript-sjekk
- `npm run build` – produksjonsbygg
- `?ark=7` i adressen starter direkte på scenario nr. 7 (sortert etter vanskelighetsgrad og tittel) og hopper over menyen.

## Klasser og moduser
- **Bil (klasse B)** og **MC (klasse A)** velges i menyen. MC har egne scenarioer (plassering i feltet, linjevalg i sving, hjelm, kollektivfelt, gruppekjøring m.m.) og deler de generelle scenarioene med bil. Fremgangen lagres per klasse.
- **Kategori:** velg «Alle» eller én kategori (f.eks. Vikeplikt og kryss, Skilt og oppmerking, Lover og ansvar) i menyen. Valget gjelder guide, øving og prøve.
- **Guidet kjøring:** bilen kjører selv gjennom situasjonene, markerer det som gjelder i tegningen og forteller hva du skal gjøre. «Kjør automatisk» går videre av seg selv etter lesetiden; slått av går du videre med «Neste» (eller Enter / piltaster).
- **Øvingsmodus:** med én kategori er øvingen en runde gjennom kategoriens scenarioer, med oppsummering til slutt. Med «Alle» fortsetter den så lenge du vil. Forklaring etter hvert svar. Spillet husker hvilke scenarioer du har sett (også mellom økter) og velger blant dem du ikke har sett på lengst, oftere fra temaer du har svart feil på. Minst 29 andre scenarioer passerer før et scenario kommer igjen. Teori og kjøring blandes: høyst ett rent teoriscenario blant tre på rad, også i prøvemodus. Svaralternativene stokkes på nytt hver gang.
- **Prøvemodus:** som den ekte teoriprøven – 45 spørsmål, maks 7 feil, 90 minutter. Resultat (bestått/ikke bestått) og forklaringer til slutt. I én kategori blir prøven kortere når kategorien har færre spørsmål, med feilgrense og tid skalert i samme forhold.
- **Læring:** egne lesesider per tema, ordnet etter Statens vegvesens temaliste, med kilder og «Øv på dette».
- Fremgangen (riktig-prosent per tema, antall scenarioer og prøveresultater) lagres i `localStorage`.

Du kan endre valget ditt helt til du trykker «Svar». Hurtigtaster: `1–4` eller `A–D` velger svar, `J`/`N` velger ja/nei, og `Enter` sender svaret eller går videre.

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

## Skiltsymboler

Skiltbildene i `public/skilt/` er Statens vegvesens offisielle symboler, fra symbolpakken
[«Trafikkskilt» i Geonorges symbolregister](https://register.geonorge.no/symbol/symbolpackages/details/1e2f592a-1d69-45a3-9ce1-e55a64fe1dc3).
De er ikke omfattet av MIT-lisensen, og registeret oppgir ikke egne bruksvilkår. Alle skiltene kan
blas gjennom under «Skiltoversikt» i menyen.

## Lisens

Koden er lisensiert under [MIT](LICENSE). Skiltsymbolene tilhører Statens vegvesen (se over).
