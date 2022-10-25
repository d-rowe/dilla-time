import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBeat } from '../lib/beatUtils';

import type { RootState } from '../app/store';

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
      const {instrumentIndex, beatIndex} = action.payload;
      const instrument = state.instruments[instrumentIndex];
      const isActive = instrument.notes[beatIndex].active;
      instrument.notes[beatIndex].active = !isActive;
    }
  },
})

export const {
  setBpm,
  toggleNote,
} = beatSlice.actions;

export const selectBeat = (state: RootState) => state.beat;

export default beatSlice.reducer;
