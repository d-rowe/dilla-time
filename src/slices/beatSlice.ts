import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBeat } from '../lib/beatUtils';

import type { RootState } from '../app/store';

const q = 256;
const e = q / 2;
const ds = 110;
const dl = q - ds;

const dillaDurations = [
  new Array(8).fill(e),
  [dl, ds, dl, ds, dl, ds, dl, ds],
  [ds, e, e, e, e, e, e, dl],
  [dl, e, e, e, e, e, e, ds],
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
