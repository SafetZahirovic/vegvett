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
/** Gang- og sykkelveg: avstand fra kjørebanens kant og bredde. */
export const CYCLE_GAP = 2.5;
export const CYCLE_WIDTH = 3;
/** Rundkjøring med to felt i ringen: større ytterradius, og kjørelinjer i indre og ytre felt. */
export const RB2_OUTER = 17;
export const RB2_DIVIDER = 11.6;
export const RB2_DRIVE_INNER = 9.1;
export const RB2_DRIVE_OUTER = 14.2;
/** Ytterradius for en rundkjøring med 1 eller 2 felt. */
export const rbOuter = (lanes?: 1 | 2) => (lanes === 2 ? RB2_OUTER : RB_OUTER);
