import { create } from "zustand";
import { SCENARIOS } from "../scenarios";
import type { Question, Scenario } from "../scenarios/types";
import { START_POSE, planTravel, type Pose, type Travel } from "../scene/pose";
import { useProgress } from "./progress";
import { pickScenario, shuffledScenarioOrder } from "./selection";

export type Mode = "ovelse" | "prove";
export type Screen = "menu" | "play" | "result" | "stats" | "signs";

/** Antall spørsmål i en prøve. */
export const EXAM_LENGTH = 20;
/** Scenarioet nye spillere starter med. */
const FIRST_SCENARIO_ID = "landevei-80";
/** Antall nylig spilte scenarioer som ikke velges igjen i øvingsmodus. */
const RECENT_LIMIT = 5;

export type ExamEntry = { scenarioId: string; questionId: string; value: string | boolean; correct: boolean };

type Exam = {
  /** Scenarioindekser i rekkefølgen de spilles. */
  order: number[];
  /** Posisjon i `order`. */
  pos: number;
  log: ExamEntry[];
};

export type SelectionKind = "sign" | "vehicle" | "pedestrian" | "animal";
export type Selection = { kind: SelectionKind; id: string } | null;

export type AnswerValue = string | boolean;
export type Answer = { value: AnswerValue; correct: boolean };

export function isCorrect(q: Question, value: AnswerValue): boolean {
  if (q.type === "order") return value === q.correct.join(",");
  return q.correct === value;
}

/** Spørsmål som besvares ved å klikke i tegningen. */
export const isSceneQuestion = (q: Question | undefined) => q?.type === "click" || q?.type === "order";

type GameState = {
  mode: Mode;
  screen: Screen;
  exam: Exam | null;
  /** Nylig spilte scenario-id-er (øvingsmodus). */
  recent: string[];
  index: number;
  /** Scenario på vei inn under bilen, eller null når ingen overgang pågår. */
  next: number | null;
  /** Fremdrift i overgangen, 0–1. */
  progress: number;
  /** Hvor nåværende scenario ligger i verden (endres når bilen svinger). */
  pose: Pose;
  /** Kjøreturen til neste scenario, mens overgangen pågår. */
  travel: Travel | null;
  hovered: string | null;
  selected: Selection;
  /** Økes for å be kartet sentrere på bilen igjen. */
  viewResetToken: number;
  /** Spørsmålet som vises nå (indeks i scenarioets spørsmål). */
  qIndex: number;
  answers: Record<string, Answer>;
  /** Objekter (skilt/kjøretøy/oppmerking) som fremheves i scenen. */
  highlight: string[];
  /** Økes når kartet skal flytte seg til de fremhevede objektene. */
  focusToken: number;
  /** Klikk så langt i et rekkefølgespørsmål. */
  picks: string[];
  /** «Vis alle kjøreretninger». */
  showAllRoutes: boolean;
  answer: (q: Question, value: AnswerValue) => void;
  /** Klikk på et objekt i tegningen mens et klikk-/rekkefølgespørsmål er aktivt. */
  pickInScene: (id: string) => void;
  resetPicks: () => void;
  nextQuestion: () => void;
  toggleAllRoutes: () => void;
  setHovered: (id: string | null) => void;
  select: (sel: Selection) => void;
  resetView: () => void;
  /** «Videre»: start transportbånd-overgang til neste scenario. */
  advance: () => void;
  startPractice: () => void;
  startExam: () => void;
  /** Avslutt prøven og vis resultatet. */
  finishExam: () => void;
  setScreen: (screen: Screen) => void;
  setProgress: (p: number) => void;
  finishTransition: () => void;
};

/** Startscenario fra URL, f.eks. `?ark=4` (nyttig under testing av nye scenarioer). Hopper over menyen. */
function arkFromUrl(): number | null {
  const n = Number(new URLSearchParams(location.search).get("ark"));
  return Number.isInteger(n) && n >= 1 && n <= SCENARIOS.length ? n - 1 : null;
}
const startArk = arkFromUrl();

/** Nullstiller alt som hører til ett scenario. */
const freshScenario = (): Partial<GameState> => ({
  qIndex: 0,
  answers: {},
  picks: [],
  highlight: [],
  selected: null,
  hovered: null,
});

export const useGame = create<GameState>((set, get) => ({
  mode: "ovelse",
  screen: startArk === null ? "menu" : "play",
  exam: null,
  recent: [],
  index: startArk ?? 0,
  next: null,
  progress: 0,
  pose: START_POSE,
  travel: null,
  hovered: null,
  selected: null,
  viewResetToken: 0,
  qIndex: 0,
  answers: {},
  highlight: [],
  focusToken: 0,
  picks: [],
  showAllRoutes: false,
  setHovered: (id) => set({ hovered: id }),
  select: (selected) => set({ selected }),
  resetView: () => set((s) => ({ viewResetToken: s.viewResetToken + 1 })),
  answer: (q, value) => {
    const { answers, mode, exam, index } = get();
    if (answers[q.id]) return;
    if (exam && exam.log.length >= EXAM_LENGTH) return;
    const correct = isCorrect(q, value);
    const scenario = SCENARIOS[index];
    useProgress.getState().recordAnswer(scenario.topic, correct);
    if (mode === "prove" && exam) {
      // Prøvemodus: ingen tilbakemelding før til slutt.
      set({
        answers: { ...answers, [q.id]: { value, correct } },
        exam: { ...exam, log: [...exam.log, { scenarioId: scenario.id, questionId: q.id, value, correct }] },
      });
      return;
    }
    set((s) => ({
      answers: { ...s.answers, [q.id]: { value, correct } },
      // Feil svar: vis de relevante objektene og flytt kartet dit.
      highlight: correct ? [] : q.highlight,
      focusToken: correct || q.highlight.length === 0 ? s.focusToken : s.focusToken + 1,
    }));
  },
  pickInScene: (id) => {
    const { index, qIndex, answers, picks, answer } = get();
    const q = SCENARIOS[index].questions[qIndex];
    if (!q || answers[q.id]) return;
    if (q.type === "click") return answer(q, id);
    if (q.type !== "order" || picks.includes(id)) return;
    const next = [...picks, id];
    set({ picks: next });
    if (next.length === q.correct.length) answer(q, next.join(","));
  },
  resetPicks: () => set({ picks: [] }),
  nextQuestion: () => set((s) => ({ qIndex: s.qIndex + 1, highlight: [], picks: [] })),
  toggleAllRoutes: () => set((s) => ({ showAllRoutes: !s.showAllRoutes })),
  advance: () => {
    const { next, index, mode, exam, recent } = get();
    if (next !== null) return;
    useProgress.getState().recordScenario();
    const current = SCENARIOS[index].id;
    let target: number;
    if (mode === "prove" && exam) {
      if (exam.log.length >= EXAM_LENGTH || exam.pos + 1 >= exam.order.length) return get().finishExam();
      target = exam.order[exam.pos + 1];
      set({ exam: { ...exam, pos: exam.pos + 1 } });
    } else {
      target = pickScenario(useProgress.getState().topics, new Set([current, ...recent]));
    }
    set({
      next: target,
      travel: planTravel(SCENARIOS[index], get().pose),
      progress: 0,
      selected: null,
      hovered: null,
      highlight: [],
      recent: [current, ...recent].slice(0, RECENT_LIMIT),
    });
  },
  startPractice: () => {
    const { topics, scenariosPlayed } = useProgress.getState();
    // Første gang: begynn med den rolige landeveien.
    const first = Math.max(0, SCENARIOS.findIndex((s) => s.id === FIRST_SCENARIO_ID));
    const index = scenariosPlayed === 0 ? first : pickScenario(topics, new Set());
    set({ ...freshScenario(), mode: "ovelse", screen: "play", exam: null, index, next: null, recent: [], pose: START_POSE, travel: null });
  },
  startExam: () => {
    const order = shuffledScenarioOrder();
    set({
      ...freshScenario(),
      mode: "prove",
      screen: "play",
      exam: { order, pos: 0, log: [] },
      index: order[0],
      next: null,
      pose: START_POSE,
      travel: null,
      showAllRoutes: false,
    });
  },
  finishExam: () => {
    const { exam } = get();
    if (exam) {
      useProgress.getState().recordExam(exam.log.filter((e) => e.correct).length, exam.log.length);
      useProgress.getState().recordScenario();
    }
    set({ screen: "result", selected: null, highlight: [] });
  },
  setScreen: (screen) => set({ screen, selected: null }),
  setProgress: (progress) => set({ progress }),
  finishTransition: () =>
    set((s) => ({
      ...freshScenario(),
      index: s.next ?? s.index,
      pose: s.travel?.nextPose ?? s.pose,
      travel: null,
      next: null,
      progress: 0,
    })),
}));

export const useScenario = (): Scenario => useGame((s) => SCENARIOS[s.index]);

/** Prøven har fått alle spørsmålene sine. */
export const useExamComplete = (): boolean => useGame((s) => !!s.exam && s.exam.log.length >= EXAM_LENGTH);

/** Alle spørsmål i scenarioet er besvart (eller prøven er ferdig). */
export const useScenarioDone = (): boolean =>
  useGame(
    (s) =>
      SCENARIOS[s.index].questions.every((q) => s.answers[q.id]) ||
      (!!s.exam && s.exam.log.length >= EXAM_LENGTH),
  );

/** Skilt hvis navn skal skjules fordi et ubesvart spørsmål spør etter det. */
export const useHiddenSigns = (): Set<string> => {
  const scenario = useScenario();
  const answers = useGame((s) => s.answers);
  return new Set(
    scenario.questions.flatMap((q) => (q.type === "choice" && q.hidesSign && !answers[q.id] ? [q.hidesSign] : [])),
  );
};

/** Spørsmålet som vises nå, hvis noen. */
export const useCurrentQuestion = (): Question | undefined =>
  useGame((s) => SCENARIOS[s.index].questions[s.qIndex]);
