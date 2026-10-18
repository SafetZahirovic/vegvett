import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { Topic } from "../scenarios/types";

export type TopicStat = { correct: number; total: number };

type ProgressState = {
  /** Riktige/totalt per tema, på tvers av øving og prøver. */
  topics: Partial<Record<Topic, TopicStat>>;
  /** Antall scenarioer der alle spørsmål er besvart. */
  scenariosPlayed: number;
  /** Prøveresultater (prosent riktige), nyeste sist. */
  exams: { date: string; correct: number; total: number }[];
  recordAnswer: (topic: Topic, correct: boolean) => void;
  recordScenario: () => void;
  recordExam: (correct: number, total: number) => void;
  reset: () => void;
};

/** localStorage kan være utilgjengelig (privat modus, blokkert lagring). Da lagres ingenting. */
const safeStorage: StateStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignorer */
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignorer */
    }
  },
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      topics: {},
      scenariosPlayed: 0,
      exams: [],
      recordAnswer: (topic, correct) =>
        set((s) => {
          const prev = s.topics[topic] ?? { correct: 0, total: 0 };
          return { topics: { ...s.topics, [topic]: { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 } } };
        }),
      recordScenario: () => set((s) => ({ scenariosPlayed: s.scenariosPlayed + 1 })),
      recordExam: (correct, total) =>
        set((s) => ({ exams: [...s.exams, { date: new Date().toISOString(), correct, total }].slice(-20) })),
      reset: () => set({ topics: {}, scenariosPlayed: 0, exams: [] }),
    }),
    { name: "vegvett-progress", version: 1, storage: createJSONStorage(() => safeStorage) },
  ),
);

/** Andel feil for et tema, eller null hvis temaet ikke er prøvd. */
export function errorRate(stat: TopicStat | undefined): number | null {
  if (!stat || stat.total === 0) return null;
  return 1 - stat.correct / stat.total;
}
