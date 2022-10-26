import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBeat } from '../lib/beatUtils';

import type { RootState } from '../app/store';

const quarter = 256;
const eighth = quarter / 2;
const dillaShort = 110;
const dillaLong = quarter - dillaShort;

const dillaDurations = [
  new Array(8).fill(eighth),
  new Array(8).fill(eighth),
  [dillaShort, eighth, eighth, eighth, eighth, eighth, eighth, dillaLong],
  [dillaLong, eighth, eighth, eighth, eighth, eighth, eighth, dillaShort],
];

type SetBpmPayload = {
  bpm: number,
};

type ToggleNotePayload = {
  instrumentIndex: number,
  beatIndex: number,
}

export const beatSlice = createSlice({
  name: 'beat',
  initialState: createInitialBeat(),
  reducers: {
    setBpm: (state, action: PayloadAction<SetBpmPayload>) => {
      state.bpm = action.payload.bpm;
    },

    toggleNote: (state, action: PayloadAction<ToggleNotePayload>) => {
      const { instrumentIndex, beatIndex } = action.payload;
      const instrument = state.instruments[instrumentIndex];
      const isActive = instrument.notes[beatIndex].active;
      instrument.notes[beatIndex].active = !isActive;
    },

    setSwing: (state) => {
      state.instruments.forEach(instrument => {
        instrument.notes.forEach((note, i) => {
          note.duration = i % 2 ? 85 : 171;
        });
      });
    },

    setStraight: state => {
      state.instruments.forEach(instrument => {
        instrument.notes.forEach(note => {
          note.duration = 128;
        });
      });
    },

    setDilla: state => {
      state.instruments.forEach((instrument, i) => {
        instrument.notes.forEach((note, j) => {
          note.duration = dillaDurations[i][j % 8];
        });
      });
    }
  },
})

export const {
  setBpm,
  toggleNote,
  setSwing,
  setStraight,
  setDilla,
} = beatSlice.actions;

export const selectBeat = (state: RootState) => state.beat;

export default beatSlice.reducer;
