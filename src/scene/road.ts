/** Felles veimål (meter). */
export const LANE = 3.25;
/** Halv kjørebanebredde inkludert kantlinje. */
export const HW = LANE + 0.25;
/** Spillerens bil står midt i høyre felt. */
export const PLAYER_U = LANE / 2;
/** Hvor langt hovedveien og sideveier tegnes. */
export const ROAD_EXTENT = 260;
/** Midtlinje: 3 m strek, 9 m mellomrom. */
export const CENTER_DASH = [3, 9] as const;
/** Rundkjøring: ytre radius, radius på midtøya og kjøresirkelen midt i ringen. */
export const RB_OUTER = 13;
export const RB_INNER = 6;
export const RB_DRIVE = (RB_OUTER + RB_INNER) / 2;
/** Lengden på trafikkøyene (dråpene) i armene inn mot rundkjøringen. */
export const RB_SPLITTER = 7;
/** Hvert scenario eier midtlinjen i v ∈ [-SCENARIO_HALF, SCENARIO_HALF). Halve transportbåndlengden. */
export const SCENARIO_HALF = 48;
