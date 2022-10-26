import { Beat, Note, Instrument, INSTRUMENT } from '../types/beatTypes';

const MEASURE_TICKS = 1024;
const DEFAULT_EIGHT_DURATION = MEASURE_TICKS / 8;
const DEFAULT_BPM = 100;
const defaultClapPattern = [0, 0, 0, 0, 0, 0, 0, 0];
const defaultHihatPattern = [1, 1, 1, 1, 1, 1, 1, 1];
const defaultSnarePattern = [0, 0, 1, 0, 0, 0, 1, 0];
const defaultKickPattern = [1, 0, 0, 0, 1, 0, 0, 1];

export function createInitialBeat(): Beat {
    return {
        bpm: DEFAULT_BPM,
        instruments: [
            createInstrument(INSTRUMENT.CLAP, defaultClapPattern),
            createInstrument(INSTRUMENT.HIHAT, defaultHihatPattern),
            createInstrument(INSTRUMENT.SNARE, defaultSnarePattern),
            createInstrument(INSTRUMENT.KICK, defaultKickPattern),
        ]
    }
}

function createInstrument(name: INSTRUMENT, pattern: number[]): Instrument {
    return {
        name,
        notes: createNotesFromPattern(pattern),
    };
}

function createNotesFromPattern(pattern: number[]): Note[] {
    return pattern.map(activeNum => ({
        active: !!activeNum,
        duration: DEFAULT_EIGHT_DURATION,
    }));
}