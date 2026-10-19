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

## Skiltbilder

Spillet bruker de **offisielle skiltsymbolene fra Statens vegvesen**, fra symbolpakken «Trafikkskilt»
i Geonorges symbolregister. Filene ligger i `public/skilt/` (329 SVG-er), og lista over dem står i
`src/signs/official-ids.ts`. Skilt uten offisiell fil (100.1, 149) tegnes i kode.

- ☐ **Bruksvilkår:** Geonorge-siden oppgir ingen lisens, bare «Kilde: Statens vegvesen». ⚠ Avklar
  vilkårene med Statens vegvesen/Geonorge før appen deles bredt. Kilden er oppgitt i appen
  (Skiltoversikt) og i README.
- ☐ Filene `farlig-sving-til-venstre`, `farlige-svinger-den-foerste-til-hoeyre` og `trafikkulykke` er
  lagt inn som 100_2, 102_1 og 153_0. `skarp-sving-til-hoeyre`, `feil-kjoereretning`, `kjetting` og
  `midtstilt-sykkelfelt` er ikke tatt med, fordi nummeret er ukjent.
- ☐ 516 Gangfelt bruker varianten 516_H.

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

Bildene er offisielle (se over). Kategorien vises som «Vikeplikt- og forkjørsskilt», etter skiltforskriften §§ 5–6.

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

## Nye skilt (`src/signs/more.ts`)

Numre og navn er kontrollert mot skiltforskriften av en AI-agent. Bildene er de offisielle (se «Skiltbilder»).

| Status | Kode | Navn | Kategori | Påstand / forklaring | Henvisning |
|---|---|---|---|---|---|
| ☐ | 100.2 | Farlig sving (til venstre) | Fareskilt | Farlig sving til venstre. | SF § 4 |
| ☐ | 102.1 | Farlige svinger | Fareskilt | Flere farlige svinger, den første til høyre. | SF § 4 |
| ☐ | 104.2 | Bratt bakke (fall) | Fareskilt | Bratt bakke nedover. ⚠ At 104.2 = fall er middels sikkert. | SF § 4 |
| ☐ | 106.1 | Smalere veg | Fareskilt | Vegen smalner på begge sider. | SF § 4 |
| ☐ | 108 | Ujevn veg | Fareskilt | Ujevn vegbane. | SF § 4 |
| ☐ | 110 | Vegarbeid | Fareskilt | Arbeid på eller ved vegen. | SF § 4 |
| ☐ | 116 | Glatt kjørebane | Fareskilt | Kjørebanen kan være spesielt glatt. | SF § 4 |
| ☐ | 124 | Farlig vegkryss | Fareskilt | Farlig kryss der vanlig høyreregel gjelder. | SF § 4 |
| ☐ | 126 | Rundkjøring | Fareskilt | Varsler rundkjøring. | SF § 4 |
| ☐ | 132 | Trafikklyssignal | Fareskilt | Varsler trafikklys. | SF § 4 |
| ☐ | 140 | Avstand til gangfelt | Fareskilt | Varsler gangfelt foran. | SF § 4 |
| ☐ | 142 | Barn | Fareskilt | Sted der barn ofte ferdes. | SF § 4 |
| ☐ | 144 | Syklende | Fareskilt | Syklende krysser eller kjører ofte ut i vegen. | SF § 4 |
| ☐ | 146.1–146.5 | Elg, Rein, Hjort, Ku, Sau | Fareskilt | Dyr ferdes ofte over eller langs vegen. ⚠ «Særlig i skumring og mørke» er et råd, ikke lovtekst. | SF § 4 |
| ☐ | 148 | Møtende trafikk | Fareskilt | Trafikk i begge retninger. | SF § 4 |
| ☐ | 149 | Kø | Fareskilt | Varsler kø. | SF § 4 |
| ☐ | 156 | Annen fare | Fareskilt | Fare uten eget skilt. | SF § 4 |
| ☐ | 210 | Forkjørskryss | Vikeplikt- og forkjørsskilt | Trafikk fra sidevegene har vikeplikt. | SF § 6 |
| ☐ | 212 | Vikeplikt overfor møtende kjørende | Vikeplikt- og forkjørsskilt | Ikke kjør inn på smalt parti hvis du hindrer møtende. | SF § 6 |
| ☐ | 214 | Møtende kjørende har vikeplikt | Vikeplikt- og forkjørsskilt | Møtende har vikeplikt for deg. | SF § 6 |
| ☐ | 306.1 | Forbudt for motorvogn | Forbudsskilt | Unntatt liten elektrisk motorvogn. | SF § 8 |
| ☐ | 306.6 | Forbudt for syklende | Forbudsskilt | Også liten elektrisk motorvogn. | SF § 8 |
| ☐ | 330.1 / 330.2 | Svingeforbud (høyre / venstre) | Forbudsskilt | Gjelder i krysset ved skiltet eller første kryss etter. | SF § 8 |
| ☐ | 332 | Vendingsforbud | Forbudsskilt | Forbud mot å vende. | SF § 8 |
| ☐ | 336 | Slutt på forbikjøringsforbud | Forbudsskilt | Avslutter 334. | SF § 8 |
| ☐ | 364 | Slutt på særskilt fartsgrense | Forbudsskilt | Generell grense gjelder (50/80). | SF § 8, VTL § 6 annet ledd |
| ☐ | 370 | Stans forbudt | Forbudsskilt | Ingen stans, heller ikke kort av- og påstigning. Gjelder til neste kryss eller nytt skilt. | SF § 8 |
| ☐ | 372 | Parkering forbudt | Forbudsskilt | Kort stans for av- og påstigning eller lasting er tillatt. | SF § 8, TR § 1 nr. 1 k |
| ☐ | 402.1–402.3 | Påbudt kjøreretning | Påbudsskilt | Høyre / venstre / rett fram. | SF § 10 |
| ☐ | 404.1 | Påbudt kjørefelt (høyre) | Påbudsskilt | Passer skiltet på høyre side. | SF § 10 |
| ☐ | 502 | Motorveg | Opplysningsskilt | Bare motorvogner som lovlig kan kjøre minst 40 km/t. Rygging, vending og stans forbudt. | SF § 12, TR § 4 nr. 2, § 11 nr. 2, § 17 nr. 1 e |
| ☐ | 518 / 520 / 522 | Gangveg / Sykkelveg / Gang- og sykkelveg | Opplysningsskilt | Ikke lov å kjøre motorvogn. Syklende ut fra sykkelveg har vikeplikt. ⚠ Kvadratisk form er middels sikker. | SF § 12, TR § 4 nr. 1, § 7 nr. 4 |
| ☐ | 527.1 | Blindveg | Opplysningsskilt | Ingen gjennomkjøring. ⚠ Utseendet er middels sikkert. | SF § 12 |
| ☐ | 552 | Parkering | Opplysningsskilt | Parkeringsplass. | SF § 12 |

## Nye veg- og objekttyper
- ☐ **Gang- og sykkelveg** langs vegen, adskilt med grøftekant, med sykkelsymbol. Den krysser sideveger uten oppmerking.
- ☐ **Smalt vegparti** (bru/vegarbeid), der bare ett kjøretøy får plass.
- ☐ **Midtdeler** på motorveg. ⚠ Forenklet: motorvegen er tegnet med ett felt i hver retning.
- ☐ **Dyr:** elg, rein, hjort, ku og sau.

## Nye scenarioer og spørsmål

| Status | Scenario / spørsmål | Riktig svar | Forklaring (kort) | Henvisning |
|---|---|---|---|---|
| ☐ | elg / elg-skilt | Elg | 146.1. | SF § 4 |
| ☐ | elg / elg-handling | Senk farten, vær klar til å stanse | Dyr er uforutsigbare. | VTL § 3 |
| ☐ | rein / rein-handling | Senk farten, stans om nødvendig, vent | Aktpågivenhet. | VTL § 3 |
| ☐ | rein / rein-ulykke | Ja | Plikt til å stanse og hjelpe, også dyr. | VTL § 12 |
| ☐ | sau / sau-skilt | Sau | 146.5. | SF § 4 |
| ☐ | sau / sau-uforutsigbar | Ja | Dyr kan gå ut uten forvarsel. | VTL § 3 |
| ☐ | gang-og-sykkelveg / gs-vikeplikt | Syklisten | Den som krysser veg fra sykkelveg / gang- og sykkelveg, har vikeplikt. | TR § 7 nr. 4, VTL § 3 |
| ☐ | gang-og-sykkelveg / gs-kjore | Nei | Ikke lov å kjøre motorvogn på gang- og sykkelveg. | TR § 4 nr. 1 |
| ☐ | parkering-forbudt / pf-skilt | Parkering forbudt | 372: én skråstrek. 370: kryss. | SF § 8 |
| ☐ | parkering-forbudt / pf-slippe-av | Ja | Kort av- og påstigning er ikke parkering. | TR § 1 nr. 1 k |
| ☐ | stans-forbudt / sf-skilt | Stans forbudt | 370. | SF § 8 |
| ☐ | stans-forbudt / sf-slippe-av | Nei | Ingen stans i det hele tatt. | SF § 8 |
| ☐ | svingeforbud / sv-skilt | Svingeforbud til venstre | 330.2. | SF § 8 |
| ☐ | svingeforbud / sv-hvor | Rett fram eller til høyre | Bare venstresving forbudt. | SF § 8 |
| ☐ | pabudt-kjoreretning / pk-skilt | Du må kjøre til høyre | 402.1. | SF § 10 |
| ☐ | pabudt-kjoreretning / pk-rett | Nei | Påbudet gjelder. | SF § 10 |
| ☐ | vendingsforbud / vf-skilt | Vendingsforbud | 332. | SF § 8 |
| ☐ | vendingsforbud / vf-snu | Nei | Forbudt å vende. | SF § 8 |
| ☐ | forkjorskryss / fk-skilt | Forkjørskryss | 210. | SF § 6 |
| ☐ | forkjorskryss / fk-hvem-forst (klikk) | Du | Begge sideveger har 202 og vikelinje. | SF § 6 |
| ☐ | farlig-vegkryss / fv-skilt | Farlig vegkryss | 124. | SF § 4 |
| ☐ | farlig-vegkryss / fv-hvem (klikk) | Bilen fra høyre | Høyreregelen. | TR § 7 nr. 2 |
| ☐ | moteplikt / mp-skilt | Vikeplikt overfor møtende kjørende | 212 (møtende har 214). | SF § 6 |
| ☐ | moteplikt / mp-hvem (klikk) | Den møtende bilen | Du venter. | SF § 6 |
| ☐ | vegarbeid / va-skilt | Vegarbeid | 110. | SF § 4 |
| ☐ | vegarbeid / va-handling | Senk farten, hold avstand, følg skilt | Aktpågivenhet, skiltet fart. | VTL § 3, SF § 8 |
| ☐ | barn / barn-skilt | Barn | 142. | SF § 4 |
| ☐ | barn / barn-hva (klikk) | Barnet ved vegkanten | Barn kan springe ut. | VTL § 3 |
| ☐ | motorveg / mv-skilt | Motorveg | 502. | SF § 12 |
| ☐ | motorveg / mv-forbudt | Rygge, vende og stanse | Forbudt på motorveg. | TR § 11 nr. 2, § 17 nr. 1 e |
| ☐ | motorveg / mv-moped | Nei | Bare motorvogn som lovlig kan kjøre minst 40 km/t. | TR § 4 nr. 2 |
| ☐ | trafikklys / tl-skilt | Trafikklyssignal | 132. | SF § 4 |
| ☐ | trafikklys / tl-gult | Stans, med mindre du ikke kan stanse trygt | Gult alene varsler rødt. | SF § 24 A (1080) |
| ☐ | glatt-kjorebane / gl-skilt | Glatt kjørebane | 116. | SF § 4 |
| ☐ | glatt-kjorebane / gl-handling | Senk farten og øk avstanden | Tilpass farten, kunne stanse på oversiktlig strekning. | VTL § 6 første ledd, TR § 13 nr. 1 |
| ☐ | slutt-fartsgrense / sf-grense | 80 km/t | Generell grense utenfor tettbygd strøk. | VTL § 6 annet ledd |
| ☐ | slutt-fartsgrense / sf-tettbygd | 50 km/t | Generell grense i tettbygd strøk. | VTL § 6 annet ledd |
| ☐ | syklist-sperrelinje / ss-forbi | Nei | Ikke kjør over sperrelinje, heller ikke for å passere syklist. | SF § 22 (1004), TR § 12 |
| ☐ | syklist-sperrelinje / ss-avstand | Minst 1,5 m | ⚠ Statens vegvesens anbefaling, ikke lovtekst. | TR § 12 |

## Kjøreanimasjon
- ☐ Spilleren kjører sin rute mellom scenarioene: venstre- og høyresving, og mot klokka rundt rundkjøringen. Neste scenario fortsetter i den nye retningen.


## Spørsmålspott og runde 3 med innhold

Hvert scenario kan ha flere spørsmål enn de tre som vises; hvert besøk trekker inntil tre tilfeldig.

### Nye skilt
| Status | Kode | Navn | Påstand | Henvisning |
|---|---|---|---|---|
| ☐ | 109 | Fartshump | Varsler fartshump. | SF § 4 |
| ☐ | 122 | Tunnel | Varsler tunnel. | SF § 4 |
| ☐ | 366 | Fartsgrensesone | Grensen gjelder i hele sonen, også sidegater, til 368 (eller 540/548). | SF § 8 |
| ☐ | 503 | Motortrafikkveg | Bare motorvogner som lovlig kan kjøre minst 40 km/t. ⚠ At TR § 4 nr. 2 også gjelder motortrafikkveg, er ikke eksplisitt verifisert. | SF § 12, TR § 4 nr. 2 |

### Ny vegtype
- ☐ **T-kryss der vegen ender** (`t-ende`): spilleren må svinge. Høyreregelen gjelder også her hvis krysset er uregulert.

### Nye spørsmål i eksisterende scenarioer
| Status | Scenario / spørsmål | Riktig svar | Henvisning |
|---|---|---|---|
| ☐ | gangfelt / gf-stanse | Nei – unngå å stanse i gangfelt | TR § 9 nr. 4 |
| ☐ | gangfelt / gf-forbi | Nei – ikke forbikjøring når sikten mot gangfeltet er hindret | TR § 12 nr. 6 |
| ☐ | gang-og-sykkelveg / gs-stanse | Nei – stans forbudt på sykkelveg | TR § 17 nr. 1 c |
| ☐ | syklist-sperrelinje / ss-svinge | Nei – ikke over sperrelinje for å svinge | SF § 22 (1004) |
| ☐ | trafikklys / tl-rodgult | Grønt kommer straks, vent | SF § 24 A |
| ☐ | trafikklys / tl-blink | Vær særlig forsiktig | SF § 24 B (1098) |
| ☐ | motorveg / mv-kjoretoy | Motorvogn som lovlig kan kjøre minst 40 km/t | TR § 4 nr. 2 |
| ☐ | parkering-forbudt / pf-definisjon | Kort av-/påstigning eller lasting er ikke parkering | TR § 1 nr. 1 k |
| ☐ | hoyreregelen / hr-syklist | Ja – syklist på kjørebanen omfattes; fra sykkelveg har syklisten vikeplikt | TR § 7 nr. 2 og 4 |
| ☐ | rundkjoring-venstre / rkv-blink-inn | Nei – ikke påbudt å blinke til venstre inn | TR § 14 nr. 2 (Vegvesen-veiledning) |
| ☐ | buss-holdeplass / buss-fare | Nei – bussføreren skal unngå fare | TR § 7 nr. 5 |
| ☐ | utrykning / utr-gront | Ja – fri veg også på grønt lys | TR § 10 nr. 1 |
| ☐ | x-kryss-stopp / stopp-uten-linje | Der du har god oversikt | SF § 6 (204) ⚠ formulering ikke ordrett verifisert |
| ☐ | landevei / lv-syklist | God sideavstand, fri sikt, ingen møtende | TR § 12, VTL § 3 |
| ☐ | elg / elg-ulykke | Ja – stanse og hjelpe, også dyr | VTL § 12 |

### Nye scenarioer
| Status | Scenario / spørsmål | Riktig svar | Henvisning |
|---|---|---|---|
| ☐ | utkjorsel-parkering / up-vikeplikt | Du har vikeplikt for all trafikk | TR § 7 nr. 4 |
| ☐ | utkjorsel-parkering / up-hoyreregel | Nei – høyreregelen gjelder ikke | TR § 7 nr. 4 |
| ☐ | utkjorsel-parkering / up-hvem-forst (klikk) | Bilen fra venstre (i feltet du svinger inn i) | TR § 7 nr. 4 |
| ☐ | t-ende-hoyreregel / te-forst (klikk) | Bilen fra høyre | TR § 7 nr. 2 |
| ☐ | t-ende-hoyreregel / te-rekkefolge | Høyre → du → venstre | TR § 7 nr. 2 |
| ☐ | t-ende-hoyreregel / te-gjennomgaende | Nei – høyreregelen gjelder i T-kryss | TR § 7 nr. 2 |
| ☐ | t-ende-vikeplikt / tv-venstre | Ja – 202 gir vikeplikt for begge retninger | SF § 6 |
| ☐ | t-ende-vikeplikt / tv-hvor | Ved vikelinjen | SF § 22 (1022) |
| ☐ | t-ende-vikeplikt / tv-skilt | Vikeplikt | SF § 6 |
| ☐ | fartshump / fh-skilt | Fartshump | SF § 4 |
| ☐ | fartshump / fh-handling | Senk farten i god tid | VTL § 6, SF § 8 |
| ☐ | fartsgrensesone / fs-skilt | Fartsgrensesone | SF § 8 |
| ☐ | fartsgrensesone / fs-sidegate | Ja | SF § 8 (366/368) |
| ☐ | fartsgrensesone / fs-slutt | Ved skilt for slutt på sonen | SF § 8 (368) |
| ☐ | tunnel / tu-skilt | Tunnel | SF § 4 |
| ☐ | tunnel / tu-lys | Ja – lys skal være tent under kjøring | TR § 15 ⚠ nummer/ordlyd ikke verifisert |
| ☐ | blindveg / bv-skilt | Blindveg | SF § 12 |
| ☐ | blindveg / bv-gjennom | Nei | SF § 12 |
| ☐ | syklist-hoyreregel / sh-forst (klikk) | Syklisten | TR § 7 nr. 2 |
| ☐ | syklist-hoyreregel / sh-gs-veg | Ja – fra gang- og sykkelveg har syklisten vikeplikt | TR § 7 nr. 4 |
| ☐ | motortrafikkveg / mt-skilt | Motortrafikkveg | SF § 12 |
| ☐ | motortrafikkveg / mt-moped | Nei | TR § 4 nr. 2 ⚠ |
| ☐ | varsel-rundkjoring / vr-skilt | Rundkjøring (fareskilt 126) | SF § 4 |
| ☐ | varsel-rundkjoring / vr-handling | Senk farten, klar til å vike | SF § 4, § 6 |
| ☐ | fjellveg / fv-bakke | Bratt bakke nedover | SF § 4 |
| ☐ | fjellveg / fv-svinger | Farlige svinger, første til høyre | SF § 4 |
| ☐ | fjellveg / fv-smalere | Smalere veg | SF § 4 |
| ☐ | fjellveg / fv-nedover | Lav fart, gjerne motorbrems | VTL § 6 første ledd (kjøreråd) |


## MC – klasse A

Klassevalget i menyen bestemmer kjøretøy og hvilke scenarioer som brukes. Scenarioer uten `licences`
gjelder både bil og MC. `parkering-forbudt` og `stans-forbudt` er bare for bil. MC-scenarioene har id
som begynner på `mc-`. Fremgangen lagres separat per klasse.

Kilder (sjekket av AI-agent 2026-10-18): verneutstyrforskriften (FOR-1979-09-21-7),
bruksforskriften (FOR-1990-01-25-92), trafikkreglene, skiltforskriften og Statens vegvesens
læreplan for klasse A (Håndbok 251, 2014) / «Sikker på MC». Det som kommer fra Statens vegvesens
veiledning, er merket «veiledning» i appen og er ikke lovtekst.

### Nye veg-/skiltelementer
- ☐ **Kurve** (`kurve`): vegen svinger 90°.
- ☐ **Kollektivfelt** til høyre for kjørefeltet, med skilt 508.1.
- ☐ **Plasseringsmarkører** i feltet (klikkspørsmål).

### Spørsmål
| Status | Scenario / spørsmål | Riktig svar | Henvisning |
|---|---|---|---|
| ☐ | mc-plassering / mcp-hvor (klikk) | Litt til venstre for midten | Vegvesen-læreplan (veiledning) |
| ☐ | mc-plassering / mcp-lov | Nei – bare «høyre side, godt innenfor feltet» | TR § 5 nr. 1 |
| ☐ | mc-plassering / mcp-hvorfor | Sikt og synbarhet | Veiledning |
| ☐ | mc-verneutstyr / mcv-utstyr | Bare hjelm er påbudt | Verneutstyrforskr. § 2 |
| ☐ | mc-verneutstyr / mcv-passasjer-hjelm | Ja | Verneutstyrforskr. § 2 |
| ☐ | mc-verneutstyr / mcv-ansvar | Føreren (passasjer under 15) | Verneutstyrforskr. § 3 |
| ☐ | mc-verneutstyr / mcv-antall | Nei – ikke flere enn registrert | Bruksforskriften § 3-1 |
| ☐ | mc-verneutstyr / mcv-unntak | Nei – unntak på parkeringsplass o.l. | Verneutstyrforskr. § 2 b ⚠ bokstav |
| ☐ | mc-lys / mcl-alltid | Ja | TR § 15 nr. 1 |
| ☐ | mc-lys / mcl-taake | Ja | TR § 15 nr. 5 |
| ☐ | mc-kollektivfelt / mck-kollektiv | Ja – tohjuls MC uten sidevogn | TR § 5 nr. 2 |
| ☐ | mc-kollektivfelt / mck-sykkelfelt | Nei | TR § 5 nr. 2 |
| ☐ | mc-kollektivfelt / mck-fortau | Nei – stans forbudt på fortau | TR § 17 nr. 1 c |
| ☐ | mc-ko / mck-mellom | Nei – kjøring mellom køer er ikke tillatt | TR § 5 nr. 1, § 12 ⚠ (ikke uttrykkelig nevnt) |
| ☐ | mc-ko / mck-hoyre | Når alle felt er fulle og farten bestemmes av den foran | TR § 12 nr. 1 c |
| ☐ | mc-ko / mck-avstand | Unngå påkjøring om den foran bremser | TR § 5 nr. 3 |
| ☐ | mc-forbikjoringsforbud / mcf-du | Nei – bil har mer enn to hjul | SF § 8 (334) |
| ☐ | mc-forbikjoringsforbud / mcf-bilen | Ja – MC har to hjul | SF § 8 (334) |
| ☐ | mc-motende-venstresving / mcm-handling | Senk farten, vær klar – ikke regn med å bli sett | Veiledning, VTL § 3 |
| ☐ | mc-motende-venstresving / mcm-vikeplikt | Ja | TR § 7 nr. 2 annet punktum |
| ☐ | mc-motende-venstresving / mcm-hvorfor | MC er liten, fart/avstand vanskelig å bedømme | Veiledning |
| ☐ | mc-sideveg / mcs-handling | Regn med at den kan kjøre ut, ha en utvei | Veiledning |
| ☐ | mc-sideveg / mcs-vikeplikt | Ja | SF § 6 |
| ☐ | mc-hoyresving / mch-start (klikk) | Venstre del av feltet | Veiledning |
| ☐ | mc-hoyresving / mch-blikk | Dit du vil kjøre | Veiledning |
| ☐ | mc-hoyresving / mch-fart | Før svingen | Veiledning, VTL § 6 |
| ☐ | mc-venstresving / mcv-start (klikk) | Inntil kantlinjen | Veiledning |
| ☐ | mc-venstresving / mcv-midtlinje | Nei | Veiledning ⚠ begrunnelsen om lening er egen formulering |
| ☐ | mc-gruppe / mcg-rad | God avstand, ikke press | Veiledning |
| ☐ | mc-gruppe / mcg-regel | Unngå påkjøring, plass til innkjøring | TR § 5 nr. 3 |
| ☐ | mc-gruppe / mcg-brems | Begge bremsene | Veiledning |
| ☐ | mc-grus-tilhenger / mcgt-grus | Senk farten før svingen | Veiledning ⚠ «unngå brå bremsing/styring» er egen formulering |
| ☐ | mc-grus-tilhenger / mcgt-tilhenger-fart | 80 km/t | TR § 13 nr. 4 |
| ☐ | mc-grus-tilhenger / mcgt-a1 | Nei – krever over 125 cm³ | Bruksforskriften § 4-2 nr. 1 |


## Runde 4: temaliste-dekning, kunnskapsspørsmål og læring

Temaene følger Statens vegvesens temaliste for teoriprøven klasse B. Fakta er kontrollert av to AI-agenter
mot Lovdata (trafikkreglene, vegtrafikkloven, bruksforskriften, førerkortforskriften,
prikkforskriften, verneutstyrforskriften, bilansvarslova, mobilforskriften, bilforskriften) og Statens
vegvesen (2026-10-19). Ingen tekst eller spørsmål er hentet fra kommersielle øvingssider.
Innholdet er skrevet for Vegvett.

### Prøveformat
- ☐ Prøvemodus: 45 spørsmål, maks 7 feil (minst 38 riktige), 90 minutter. Ubesvarte spørsmål teller som feil.
  Kilde: Statens vegvesen, gjennomføring av teoriprøven.

### Usikkert / bevisst utelatt
- ⚠ Tommelfingerreglene for stopplengde er bare nevnt i læringsteksten som grove anslag (ikke funnet i norsk kilde).
- ⚠ Varsellampenes fargebetydning bygger på ISO-konvensjon og instruksjonsbøker, ikke lov.
- ⚠ «Sov ca. 15 minutter» ved trøtthet er sekundær gjengivelse av vegvesen-råd.
- ⚠ HLR 30:2-detaljene er standard etter NRR-retningslinjer, men ikke lest i originaldokumentet.
- Utelatt: tåkelys sammen med nærlys (TR § 15 nr. 5 er uklar), bøtesatser, kø-hale med nødblink.

### Nye spørsmål
| Status | Scenario / spørsmål | Riktig svar | Henvisning |
|---|---|---|---|
| ☐ | k-ansvar / ka-prikker | 8 prikker | Forskrift om prikkbelastning § 4 |
| ☐ | k-ansvar / ka-provetid | Du får dobbelt antall prikker, fordi du er i prøveperioden | Forskrift om prikkbelastning § 3; førerkortforskriften § 4-2 |
| ☐ | k-ansvar / ka-mobil | Nei | Forskrift om forbud mot bruk av mobiltelefon under kjøring § 2 |
| ☐ | k-ansvar / ka-forsikring | Ja | Bilansvarslova §§ 4, 5 og 15 |
| ☐ | k-ansvar / ka-politi | Følger politiets anvisning | Trafikkreglene § 3 |
| ☐ | k-ansvar / ka-drikke | Nei | Vegtrafikkloven § 22 femte ledd |
| ☐ | k-ansvar / ka-promille-provetid | Ja | Vegtrafikkloven § 33 nr. 1; tapsforskriften § 3-1 |
| ☐ | k-barn-i-bil / kb-135 | Barn under 135 cm | Forskrift om verneutstyr (sikring av barn), Statens vegvesen |
| ☐ | k-barn-i-bil / kb-airbag | Nei | Forskrift om verneutstyr, Statens vegvesen |
| ☐ | k-barn-i-bil / kb-ansvar | Føreren | Forskrift om verneutstyr |
| ☐ | k-barn-i-bil / kb-bakovervendt | Til barnet er minst 4 år | Trygg Trafikk (anbefaling) |
| ☐ | k-dekk / kd-sommer | 1,6 mm | Bruksforskriften § 1-4 nr. 2 |
| ☐ | k-dekk / kd-vinter | 3 mm | Bruksforskriften § 1-4 nr. 2 |
| ☐ | k-dekk / kd-vinterperiode | Fra 1. november til første søndag etter 2. påskedag | Bruksforskriften § 1-4 nr. 2 |
| ☐ | k-dekk / kd-pigg | Nei | Bruksforskriften § 1-4 nr. 4 |
| ☐ | k-dekk / kd-dato | Nei | Bruksforskriften § 1-4 nr. 3 |
| ☐ | k-fletting-rygging / kfr-feltskifte | Ja | Trafikkreglene § 8 nr. 1 |
| ☐ | k-fletting-rygging / kfr-glidelas | Vekselvis, én fra hvert felt – glidelåsprinsippet | Trafikkreglene § 8 nr. 1 tredje ledd |
| ☐ | k-fletting-rygging / kfr-akselerasjon | Tilpasser farten til trafikken i feltet du skal inn i | Trafikkreglene § 8 nr. 2 |
| ☐ | k-fletting-rygging / kfr-rygge | Du har vikeplikt for alle andre | Trafikkreglene § 11 nr. 1 |
| ☐ | k-fletting-rygging / kfr-motorveg | Nei | Trafikkreglene § 11 nr. 2 |
| ☐ | k-forerkort / kf-b | 3 500 kg | Førerkortforskriften § 3-1 |
| ☐ | k-forerkort / kf-tilhenger | Høyst 750 kg | Førerkortforskriften § 3-1 og § 3-5 |
| ☐ | k-forerkort / kf-brems | Halvparten av bilens egenvekt, og aldri over 750 kg | Bilforskriften § 11-1 |
| ☐ | k-forerkort / kf-ovelse | Fylt 25 år og hatt førerett i klassen sammenhengende i 5 år | Vegtrafikkloven § 26 |
| ☐ | k-forerkort / kf-alder | Når du er 16 år | Vegtrafikkloven § 26 |
| ☐ | k-forerkort / kf-teoriprove | 45 spørsmål, minst 38 riktige, 90 minutter | Statens vegvesen: gjennomføring av teoriprøven |
| ☐ | k-forstehjelp / bil-a | svh | Vegtrafikkloven § 12; bruksforskriften § 1-6 |
| ☐ | k-forstehjelp / kf-113 | 113 | Nasjonale nødnumre |
| ☐ | k-forstehjelp / kf-plikt | Ja | Vegtrafikkloven § 12 |
| ☐ | k-forstehjelp / kf-puster | Legger personen i stabilt sideleie og følger med på pusten | Norsk resuscitasjonsråd (førstehjelp) |
| ☐ | k-forstehjelp / kf-hlr | 30 brystkompresjoner og 2 innblåsninger, om igjen | Norsk resuscitasjonsråd (førstehjelp) |
| ☐ | k-lys-utstyr / kl-fjernlys | Blender av til nærlys, så du ikke blender den møtende | Trafikkreglene § 15 nr. 2 og 3 |
| ☐ | k-lys-utstyr / kl-parkering | Parkeringslys – hovedlysene skal være slått av | Trafikkreglene § 15 nr. 4 |
| ☐ | k-lys-utstyr / kl-trekant | Minst 150 meter | Bruksforskriften § 1-6 nr. 2 |
| ☐ | k-lys-utstyr / kl-vest | Ja | Bruksforskriften § 1-6 nr. 3 |
| ☐ | k-lys-utstyr / kl-fare | Varsle andre med nødsignallys, varseltrekant eller på annen måte | Bruksforskriften § 1-6 nr. 2 |
| ☐ | k-mennesket / km-trott | Stanser på et trygt sted og sover en kort stund | Vegtrafikkloven § 21 |
| ☐ | k-mennesket / km-skikket | Ja | Vegtrafikkloven § 21 |
| ☐ | k-mennesket / km-promille | Over 0,2 promille | Vegtrafikkloven § 22 |
| ☐ | k-mennesket / km-trekant | Legemidlet kan påvirke kjøreevnen – les pakningsvedlegget og snakk med lege | Vegtrafikkloven § 21; Legemiddelverkets ordning med varseltrekant |
| ☐ | k-mennesket / km-syn | Synsstyrke på minst 0,5 med begge øyne samlet | Førerkortforskriften vedlegg 1 § 9 |
| ☐ | k-mennesket / km-fartsblind | At du ikke kjører for fort – sjekk speedometeret, farten føles lavere enn den er | Statens vegvesens temaliste: sanser |
| ☐ | k-miljo / kmi-tomgang | Nei | Trafikkreglene § 16 nr. 1 |
| ☐ | k-miljo / kmi-jevn | Jevn kjøring, planlegging og bruk av motorbrems | Statens vegvesens temaliste: miljøhensyn |
| ☐ | k-miljo / kmi-takboks | Ja | Statens vegvesens temaliste: miljøhensyn |
| ☐ | k-miljo / kmi-dekktrykk | Det øker, og veigrepet blir dårligere | Statens vegvesens temaliste: miljøhensyn |
| ☐ | k-stopplengde / ks-definisjon | Reaksjonslengden pluss bremselengden | Statens vegvesens temaliste: stopplengde, bremselengde, reaksjonslengde |
| ☐ | k-stopplengde / ks-dobbel | Den blir omtrent fire ganger så lang | Fysikk (bevegelsesenergi øker med farten i andre) |
| ☐ | k-stopplengde / ks-reaksjonstid | Omtrent 1 sekund | Statens vegvesens temaliste: sanser og reaksjonstid |
| ☐ | k-stopplengde / ks-glatt | Ja | Statens vegvesens temaliste: vegforhold og veggrep |
| ☐ | k-stopplengde / ks-abs | Hindrer at hjulene låser seg, slik at du kan styre mens du bremser hardt | Statens vegvesens temaliste: førerstøttesystemer |
| ☐ | k-teknikk / kt-rod | Stanser så snart det er trygt og undersøker – følg instruksjonsboka | Fargekoden for varsellamper (ISO-standard, bilens instruksjonsbok) |
| ☐ | k-teknikk / kt-ansvar | Ja | Vegtrafikkloven § 3 og § 21 |
| ☐ | k-teknikk / kt-kontroll | At rutene er isfrie, lysene virker og det ikke ligger snø på taket | Statens vegvesens temaliste: sikkerhetskontroll |
| ☐ | k-teknikk / kt-last | Den skal merkes ytterst, og i mørke også med lykt | Bruksforskriften § 3-4 nr. 3 |
| ☐ | k-teknikk / kt-sikring | Ja | Bruksforskriften § 3-3 |
| ☐ | k-tunnel / ktu-brann | Setter bilen til siden med nødsignallys og går ut av tunnelen til fots | Statens vegvesen: Brann i tunnel |
| ☐ | k-tunnel / ktu-telefon | Ja | Statens vegvesen: Brann i tunnel |
| ☐ | k-tunnel / ktu-rodt | Stanser og kjører ikke inn | Statens vegvesen: Trygg i tunnel |
| ☐ | k-tunnel / ktu-stans | Nei | Trafikkreglene § 17 nr. 1 a |
| ☐ | trikk / trikken | stans | Trafikkreglene § 9 nr. 3 |
| ☐ | trikk / tr-fri-veg | Ja | Trafikkreglene § 10 nr. 2 |
| ☐ | trikk / tr-forbi | På høyre side | Trafikkreglene § 12 nr. 1 b |
| ☐ | trikk / tr-fart | Ja | Trafikkreglene § 13 nr. 2 e |
| ☐ | planovergang / stopplinje | bom | Skiltforskriften § 4 (skilt 134 og 135) |
| ☐ | planovergang / po-rodt | Stanser ved stopplinjen eller i trygg avstand | Skiltforskriften § 24 (signal 1096) |
| ☐ | planovergang / po-avstand | Nærmere enn 5 meter | Trafikkreglene § 17 nr. 1 f |
| ☐ | planovergang / po-sikret | Ja | Trafikkreglene § 10 nr. 2 |

### Læringssider (`src/learning/articles/`)
- ☐ Alle læringssider er egne tekster med kildeliste nederst. De må gjennomgås på samme måte som spørsmålene.


## Ikke dekket ennå
- Feltvalg i tofelts rundkjøring (krever at to felt i ringen kan tegnes).
- Trikk som kjøretøytype.
- Kollektivfelt (508) og sambruksfelt (509), som krever flere felt.
- Lyskryss med fungerende trafikklys i tegningen.
