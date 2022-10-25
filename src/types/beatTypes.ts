export type Note = {
  active: boolean,
  duration: number,
};

export type Beat = {
  bpm: number,
  instruments: Instrument[],
};

export type Instrument = {
  name: INSTRUMENT,
  notes: Note[]
};

export enum INSTRUMENT {
  KICK = 'KICK',
  SNARE = 'SNARE',
  HIHAT = 'HIHAT',
  CLAP = 'CLAP',
}

