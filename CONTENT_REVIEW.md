# Innholdsgjennomgang – regelpåstander

Alle faglige påstander i spillet er listet her, slik at de kan kvalitetssikres mot
trafikkreglene, skiltforskriften, vegtrafikkloven og Statens vegvesens materiell.
Kryss av når en påstand er kontrollert. Kilden i koden står i overskriften.

Status: ☐ = ikke kontrollert av menneske · ☑ = kontrollert OK · ✎ = må endres

**Forhåndssjekk:** Henvisningene er sjekket mot Lovdata av en AI-agent (oktober 2026).
Det erstatter ikke en menneskelig gjennomgang. Påstander med middels eller lav sikkerhet er merket ⚠.

## Kilder

- Trafikkreglene (TR): <https://lovdata.no/dokument/SF/forskrift/1986-03-21-747>
- Vegtrafikkloven (VTL): <https://lovdata.no/dokument/NL/lov/1965-06-18-4>
- Skiltforskriften (SF): <https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219>
- Statens vegvesen om rundkjøring: <https://www.vegvesen.no/trafikkinformasjon/trafikksikkerhet/trafikkregler/kjoring-i-rundkjoringer/>
- Vegoppmerking N302 (høringsutgave 2015). Den gjeldende 2025-utgaven er ikke lest, så målene herfra er ⚠.

Skiltforskriften er bygd opp i par av paragrafer. Den første i hvert par gir alminnelige
bestemmelser, den andre de enkelte skiltene:
§§ 3–4 fareskilt · §§ 5–6 vikeplikt- og forkjørsskilt · §§ 7–8 forbudsskilt · §§ 9–10 påbudsskilt ·
§§ 11–12 opplysningsskilt · §§ 21–22 vegoppmerking.

## Skilt (`src/signs/registry.ts`)

| Status | Kode | Navn | Kategori | Påstand / forklaring | Henvisning |
|---|---|---|---|---|---|
| ☐ | 100.1 | Farlig sving (til høyre) | Fareskilt | Varsler en farlig sving til høyre. ⚠ At .1 = høyre og .2 = venstre er ikke bekreftet. | SF § 4 |
| ☐ | 202 | Vikeplikt | Vikeplikt- og forkjørsskilt | Vikeplikt overfor kjørende på vegen du skal inn på eller krysse. Står normalt ved vikelinje. | SF § 6, TR § 7 nr. 1 |
| ☐ | 204 | Stopp | Vikeplikt- og forkjørsskilt | Full stans ved stopplinjen (eller der du har oversikt), deretter vikeplikt. | SF § 6, TR § 7 nr. 1 |
| ☐ | 206 | Forkjørsveg | Vikeplikt- og forkjørsskilt | Kjørende fra tilstøtende veger har vikeplikt overfor deg. Gjelder til skilt 208. | SF § 6 |
| ☐ | 208 | Slutt på forkjørsveg | Vikeplikt- og forkjørsskilt | Etter skiltet gjelder vanlige vikepliktregler, f.eks. høyreregelen. | SF § 6, TR § 7 nr. 2 |
| ☐ | 302 | Innkjøring forbudt | Forbudsskilt | Forbud mot innkjøring fra den siden skiltet står. Gjelder alle kjøretøy, også sykkel, hvis ikke underskilt gjør unntak. | SF § 8 |
| ☐ | 334 | Forbikjøringsforbud | Forbudsskilt | Forbud mot å kjøre forbi motorvogn med mer enn to hjul. Gjelder til skilt 336 eller så langt underskilt angir. | SF § 8 |
| ☐ | 362 | Fartsgrense | Forbudsskilt | Høyeste tillatte fart fra skiltet til ny fartsgrense er skiltet. | SF § 8 |
| ☐ | 406 | Påbudt rundkjøring | Påbudsskilt | Kjør mot klokka rundt midtøya. | SF § 10 |
| ☐ | 516 | Gangfelt | Opplysningsskilt | Viser gangfelt. Vikeplikt for gående som er i gangfeltet eller på vei ut i det. | SF § 12, TR § 9 nr. 2 |

Tegningene er forenklet. Kategorien vises som «Vikeplikt- og forkjørsskilt», etter skiltforskriften §§ 5–6.

## Vegoppmerking (`src/scene/Ground.tsx`)

| Status | Påstand | Kode | Henvisning |
|---|---|---|---|
| ☐ | Linjer som skiller motgående trafikk er gule. Kantlinjer og annen oppmerking er hvit. | – | SF § 21 nr. 3 |
| ☐ | Vanlig midtlinje (kjørefeltlinje): 3 m strek / 9 m mellomrom. ⚠ Ved 50 km/t eller lavere skal den være 1 m / 3 m. Appen bruker alltid 3/9. | 1000 | SF § 22, N302 |
| ☐ | Varsellinje: 9 m strek / 3 m mellomrom. Gul varsellinje betyr at sikten er for kort til vanlig forbikjøring. | 1002 | SF § 22 |
| ☐ | Sperrelinje skal ikke kjøres på eller over. Som midtlinje tegnes den dobbel (1006.4), fordi enkel sperrelinje ikke brukes alene som midtlinje. | 1004 / 1006 | SF § 22 |
| ☐ | Kantlinje er heltrukken hvit. | 1012 | SF § 22 |
| ☐ | Vikelinje: rad av trekanter med spissen mot den som har vikeplikt. ⚠ Trekantens mål (0,5 × 0,6 m) er anslått. | 1022 | SF § 22 |
| ☐ | Stopplinje: bred heltrukken linje, tegnet 0,5 m. ⚠ Bredden er anslått. Brukes bare med skilt 204 eller lyssignal. | 1020 | SF § 22 |
| ☐ | Gangfelt: striper 0,5 m med 0,5 m mellomrom, 3,5 m langt. Har samme virkning som skilt 516. | 1024 | SF § 22 |

## Scenarioer og spørsmål (`src/scenarios/*.ts`)

Alle scenarioer har høyretrafikk: spilleren kjører i høyre felt, og møtende trafikk kjører i venstre felt (TR § 5 nr. 1).

| Status | Scenario / spørsmål | Riktig svar | Forklaring (kort) | Henvisning |
|---|---|---|---|---|
| ☐ | landevei / fart-betydning | Høyeste tillatte fart 80 | Skilt 362 viser høyeste tillatte fart. | SF § 8 |
| ☐ | landevei / fart-forhold | Nei | Fartsgrensen er en øvre grense. Farten skal tilpasses forholdene. | VTL § 6 første ledd |
| ☐ | t-kryss-forkjorsveg / hvem-viker | Den gule bilen | Du er på forkjørsveg. Sidevegen har 202 og vikelinje. | SF § 6, TR § 7 nr. 1 |
| ☐ | t-kryss-forkjorsveg / skilt-sideveg | Vikeplikt | Skilt 202 står ved vikelinjen. | SF § 6 |
| ☐ | t-kryss-forkjorsveg / forkjorsveg-aktsom | Nei | Du skal være aktpågivende og kunne stanse. | VTL § 3 |
| ☐ | x-kryss-stopp / stopp-handling | Stanse ved stopplinjen, så vike | Alltid full stans, også når vegen er fri. | SF § 6 |
| ☐ | x-kryss-stopp / venstre-viker | Nei | Stopp gir vikeplikt for all kryssende trafikk. | SF § 6 |
| ☐ | hoyreregelen / hvem-forst (klikk) | Bilen fra høyre | Uregulert kryss: høyreregelen. | TR § 7 nr. 2 |
| ☐ | hoyreregelen / rekkefolge | Høyre → du → venstre | Bilen fra venstre har deg på sin høyre side. | TR § 7 nr. 2 |
| ☐ | gangfelt / gf-hvem (klikk) | Fotgjengeren på vei ut | Vikeplikt for gående i eller på vei ut i gangfeltet. | TR § 9 nr. 2 |
| ☐ | gangfelt / gf-skilt | Gangfelt | Skilt 516. Oppmerkingen har samme virkning. | SF § 12 |
| ☐ | rundkjoring-inn / rk-hvem-forst (klikk) | Bilen i ringen | 202 og vikelinje ved innkjøringen. | SF § 6, SF § 22 |
| ☐ | rundkjoring-inn / rk-retning | Ja | 406: mot klokka. | SF § 10 |
| ☐ | sperrelinje / sperre-navn | Sperrelinje | Heltrukken gul midtlinje, her dobbel. | SF § 22 |
| ☐ | sperrelinje / sperre-forbi | Nei | Forbikjøring krever å krysse sperrelinjen. | SF § 22, TR § 12 |
| ☐ | buss-holdeplass / buss-slippe | Ja | Fartsgrense 50 ≤ 60: vikeplikt for buss som gir tegn. | TR § 7 nr. 5 |
| ☐ | buss-holdeplass / buss-80 | 60 km/t eller lavere | Vikeplikten gjelder bare der fartsgrensen er 60 eller lavere. | TR § 7 nr. 5 |
| ☐ | slutt-forkjorsveg / slutt-betydning | Slutt på forkjørsveg | 208. | SF § 6 |
| ☐ | slutt-forkjorsveg / slutt-hvem-viker | Du | Uregulert kryss etter 208: høyreregelen. | TR § 7 nr. 2 |
| ☐ | rundkjoring-ut / rk-blink-nar | Ved avkjøringen før din | ⚠ Tidspunktet er Statens vegvesens veiledning, ikke lovtekst. | TR § 14 nr. 2 |
| ☐ | rundkjoring-ut / rk-blink-ut | Ja | Utkjøring er en sving til høyre, og da skal du gi tegn. ⚠ Lovteksten nevner ikke rundkjøring spesielt. | TR § 14 nr. 2 |
| ☐ | forbikjoringsforbud / forbud-betydning | Forbikjøringsforbud | 334, gjelder til 336. | SF § 8 |
| ☐ | forbikjoringsforbud / forbud-stiplet | Nei | Skiltet gjelder selv om midtlinjen er stiplet. | SF § 8 |
| ☐ | utrykning / utr-hva | Gi fri veg, stans om nødvendig | Blinkende blått lys utløser plikten. | TR § 10 nr. 1 |
| ☐ | utrykning / utr-motende | Ja | Plikten gjelder alle trafikanter. | TR § 10 nr. 1 |
| ☐ | varsellinje / varsel-betydning | Sikten er for kort til vanlig forbikjøring | Gul varsellinje. | SF § 22 |
| ☐ | varsellinje / varsel-krysse | Ja | ⚠ At varsellinje kan krysses, er ikke eksplisitt verifisert. | SF § 22, TR § 12 |
| ☐ | farlig-sving / sving-betydning | Farlig sving til høyre | Skilt 100. | SF § 4 |
| ☐ | farlig-sving / sving-fart | Ja | Farten skal tilpasses forholdene. | VTL § 6 første ledd |
| ☐ | rundkjoring-venstre / rkv-retning | Mot klokka | 406 gjelder uansett hvor du skal. | SF § 10 |
| ☐ | rundkjoring-venstre / rkv-vike (klikk) | Bilen som kommer i ringen | Vikeplikt for trafikk i ringen. | SF § 6, SF § 22 |
| ☐ | kombinasjon-venstresving / komb-motende | Ja | Venstresvingende har vikeplikt for møtende, også på forkjørsveg. | TR § 7 nr. 2 annet punktum |
| ☐ | kombinasjon-venstresving / komb-rekkefolge | Møtende → du → sidevegen | Sidevegen har 202 og vikelinje. | TR § 7 nr. 2, SF § 6 |

### Scenariooppsett som bør sjekkes
- ☐ **landevei:** syklisten kjører langs høyre kant i samme retning som deg.
- ☐ **t-kryss-forkjorsveg:** den gule bilen blinker til venstre og skal svinge til venstre ut på forkjørsvegen.
- ☐ **hoyreregelen:** krysset har verken skilt eller oppmerking, og alle tre kjører rett frem.
- ☐ **rundkjoring-\*:** rundkjøringen har ett felt. Vikeplikten følger av 202 og vikelinje, ikke av en egen rundkjøringsregel i trafikkreglene.
- ☐ **buss-holdeplass:** busslomma er tegnet med stiplet kantlinje forbi lomma. ⚠ Utformingen er forenklet.
- ☐ **utrykning:** du blinker til høyre og kjører inn til siden, og den møtende bilen gjør det samme.

## Ikke dekket ennå
- Feltvalg i tofelts rundkjøring (krever at to felt i ringen kan tegnes).
- Trikk som kjøretøytype.
