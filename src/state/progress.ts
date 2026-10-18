import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { Licence, Topic } from "../scenarios/types";

export type TopicStat = { correct: number; total: number };

/** Fremgang for én førerkortklasse. */
export type LicenceStats = {
  /** Riktige/totalt per tema, på tvers av øving og prøver. */
  topics: Partial<Record<Topic, TopicStat>>;
  /** Antall scenarioer der alle spørsmål er besvart. */
  scenariosPlayed: number;
  /** Prøveresultater, nyeste sist. */
  exams: { date: string; correct: number; total: number }[];
};

const emptyStats = (): LicenceStats => ({ topics: {}, scenariosPlayed: 0, exams: [] });

type ProgressState = {
  /** Valgt klasse (bil eller MC). */
  licence: Licence;
  stats: Record<Licence, LicenceStats>;
  /** Når hvert scenario sist ble vist (løpenummer), så nye økter starter med det du ikke har sett. */
  lastSeen: Record<string, number>;
  seenCounter: number;
  setLicence: (licence: Licence) => void;
  markSeen: (scenarioId: string) => void;
  recordAnswer: (topic: Topic, correct: boolean) => void;
  recordScenario: () => void;
  recordExam: (correct: number, total: number) => void;
  /** Sletter fremgangen for valgt klasse. */
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
    (set) => {
      /** Oppdaterer statistikken for valgt klasse. */
      const update = (fn: (s: LicenceStats) => Partial<LicenceStats>) =>
        set((st) => ({ stats: { ...st.stats, [st.licence]: { ...st.stats[st.licence], ...fn(st.stats[st.licence]) } } }));
      return {
        licence: "B",
        stats: { B: emptyStats(), A: emptyStats() },
        lastSeen: {},
        seenCounter: 0,
        setLicence: (licence) => set({ licence }),
        markSeen: (id) =>
          set((s) => ({ seenCounter: s.seenCounter + 1, lastSeen: { ...s.lastSeen, [id]: s.seenCounter + 1 } })),
        recordAnswer: (topic, correct) =>
          update((s) => {
            const prev = s.topics[topic] ?? { correct: 0, total: 0 };
            return { topics: { ...s.topics, [topic]: { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 } } };
          }),
        recordScenario: () => update((s) => ({ scenariosPlayed: s.scenariosPlayed + 1 })),
        recordExam: (correct, total) =>
          update((s) => ({ exams: [...s.exams, { date: new Date().toISOString(), correct, total }].slice(-20) })),
        reset: () => update(() => emptyStats()),
      };
    },
    {
      name: "vegvett-progress",
      version: 2,
      storage: createJSONStorage(() => safeStorage),
      // Versjon 1 hadde bare bil: flytt den fremgangen til klasse B.
      migrate: (persisted, version) => {
        const old = (persisted ?? {}) as Record<string, unknown>;
        if (version < 2) {
          return {
            licence: "B",
            stats: {
              B: {
                topics: (old.topics as LicenceStats["topics"]) ?? {},
                scenariosPlayed: (old.scenariosPlayed as number) ?? 0,
                exams: (old.exams as LicenceStats["exams"]) ?? [],
              },
              A: emptyStats(),
            },
            lastSeen: (old.lastSeen as Record<string, number>) ?? {},
            seenCounter: (old.seenCounter as number) ?? 0,
          };
        }
        return old;
      },
    },
  ),
);

/** Fremgangen for valgt klasse. */
export const useStats = (): LicenceStats => useProgress((s) => s.stats[s.licence]);

/** Andel feil for et tema, eller null hvis temaet ikke er prøvd. */
export function errorRate(stat: TopicStat | undefined): number | null {
  if (!stat || stat.total === 0) return null;
  return 1 - stat.correct / stat.total;
}
