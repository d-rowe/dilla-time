export type Grid = number[][];

const EIGHTH_TICKS = 128;
const INSTRUMENTS = 4;


export const straightGrid: Grid = new Array(INSTRUMENTS).fill(new Array(8).fill(EIGHTH_TICKS));
export const swingGrid: Grid = new Array(INSTRUMENTS).fill([171, 85, 171, 85, 171, 85, 171, 85]);
