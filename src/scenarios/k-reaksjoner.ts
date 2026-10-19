import { knowledge } from "./kunnskap";

/** Grunnregelen, hva som gjelder foran hva, forelegg, beslag og plikter ved ulykke. */
export const kReaksjoner = knowledge({
  id: "k-reaksjoner",
  title: "Grunnregel, forelegg og beslag",
  topic: "ansvar",
  difficulty: 2,
  questions: [
    {
      id: "kr-grunnregel",
      type: "choice",
      prompt: "Hva sier grunnregelen i vegtrafikkloven?",
      options: [
        { id: "hensyn", text: "Du skal være hensynsfull, aktpågivende og varsom, så det ikke oppstår fare eller skade" },
        { id: "skilt", text: "Du skal følge skiltene, ellers kan du kjøre som du vil" },
        { id: "fart", text: "Du skal alltid holde fartsgrensen" },
        { id: "storst", text: "Store kjøretøy har alltid forrang" },
      ],
      correct: "hensyn",
      explanation:
        "Grunnregelen sier at alle skal ferdes hensynsfullt og være aktpågivende og varsomme, så det ikke kan oppstå fare eller skade, og så annen trafikk ikke hindres eller forstyrres unødig. Den gjelder alltid, også der ingen annen regel passer.",
      rule: "Vegtrafikkloven § 3",
      highlight: [],
    },
    {
      id: "kr-foran",
      type: "choice",
      prompt: "Hva går foran hva i trafikken?",
      options: [
        { id: "riktig", text: "Politiets tegn går foran alt, og lyssignal, skilt og oppmerking går foran trafikkreglene" },
        { id: "skilt", text: "Skilt går foran politiets tegn" },
        { id: "regler", text: "Trafikkreglene går alltid foran skilt" },
        { id: "lys", text: "Lyssignal går foran politiets tegn" },
      ],
      correct: "riktig",
      explanation:
        "Tegn fra politiet går foran alt annet. Lyssignal, skilt og oppmerking går foran de generelle trafikkreglene, og lyssignal går foran vikeplikt som er gitt med skilt.",
      rule: "Trafikkreglene § 3 nr. 1 og 2",
      highlight: [],
    },
    {
      id: "kr-forelegg",
      type: "yesno",
      prompt: "Politiet gir deg et forenklet forelegg på stedet. Er du nødt til å vedta det?",
      correct: false,
      explanation:
        "Du kan velge å ikke vedta et forenklet forelegg. Da kan saken gå videre som vanlig straffesak, der politiet vurderer et ordinært forelegg eller å ta saken til retten.",
      rule: "Straffeprosessloven § 256",
      highlight: [],
    },
    {
      id: "kr-beslag",
      type: "yesno",
      prompt: "Kan politiet ta førerkortet ditt i beslag på stedet når du har kjørt så mye for fort at du kan miste føreretten?",
      correct: true,
      explanation:
        "Politiet kan ta førerkortet i beslag når det er grunn til å tro at du har gjort noe som kan føre til tap av føreretten. Da kan du ikke kjøre videre.",
      rule: "Vegtrafikkloven § 33 nr. 3",
      highlight: [],
    },
    {
      id: "kr-parkert",
      type: "choice",
      prompt: "Du skraper borti en parkert bil, og eieren er ikke der. Hva skal du gjøre?",
      options: [
        { id: "varsle", text: "Varsle eieren eller politiet" },
        { id: "kjor", text: "Kjøre videre hvis skaden er liten" },
        { id: "vente", text: "Vente en halvtime, og så kjøre" },
        { id: "forsikring", text: "Bare melde det til ditt eget forsikringsselskap neste uke" },
      ],
      correct: "varsle",
      explanation:
        "Er du innblandet i et uhell, skal du stanse. Er det bare skade på ting og ingen er til stede for eieren, skal du snarest mulig varsle eieren eller politiet.",
      rule: "Vegtrafikkloven § 12 første ledd",
      highlight: [],
    },
    {
      id: "kr-navn",
      type: "yesno",
      prompt: "Har du plikt til å oppgi navn og adresse til de andre som er innblandet i et trafikkuhell?",
      correct: true,
      explanation:
        "De som er innblandet, skal oppgi navn og adresse til hverandre. Føreren skal også oppgi eierens navn og adresse og bilens kjennemerke.",
      rule: "Vegtrafikkloven § 12",
      highlight: [],
    },
    {
      id: "kr-kasko",
      type: "choice",
      prompt: "Du kjører i grøfta, og det er din feil. Hvilken forsikring dekker skaden på din egen bil?",
      options: [
        { id: "kasko", text: "Kaskoforsikring, hvis du har den" },
        { id: "trafikk", text: "Den lovpålagte trafikkforsikringen" },
        { id: "ingen", text: "Staten dekker alle skader" },
        { id: "vegvesen", text: "Statens vegvesen" },
      ],
      correct: "kasko",
      explanation:
        "Trafikkforsikringen er påbudt og dekker skader på andre personer og ting. Skade på din egen bil dekkes bare hvis du har tatt kaskoforsikring.",
      rule: "Bilansvarslova §§ 4, 5 og 15",
      highlight: [],
    },
  ],
});
