import * as Tone from 'tone';
import { INSTRUMENT } from './constants';
import drumSampler from './DrumSampler';

const LOOP_DURATION = '4:0:0';
// Seems like Dilla was draw to tempos around 100bpm most of the time
const DEFAULT_BPM = 100;

class Playback {
    declare private schedules: Map<INSTRUMENT, Map<number, number>>;

    constructor() {
        this.schedules = new Map();
        this.setTempo(DEFAULT_BPM);
    }

    scheduleNote(instrument: INSTRUMENT, beatIndex: number, tick: number): void {
        if (this.schedules.get(instrument)?.get(beatIndex) === undefined) {
            const beatMap = new Map();
            beatMap.set(beatIndex, undefined);
            this.schedules.set(instrument, beatMap);
        }
        const existingScheduleId = this.schedules.get(instrument)?.get(beatIndex);
        if (existingScheduleId !== undefined) {
            Tone.Transport.cancel(existingScheduleId);
        }
        const tickTime = Tone.Time({ '256n': tick }).valueOf();
        const newScheduleId = Tone.Transport.scheduleRepeat(time => {
            drumSampler.trigger(instrument, time);
        }, LOOP_DURATION, tickTime);

        this.schedules.get(instrument)?.set(beatIndex, newScheduleId);
    }

    clearBeat(instrument: INSTRUMENT, beatIndex: number): void {
        const scheduleId = this.schedules.get(instrument)?.get(beatIndex);
        if (scheduleId !== undefined) {
            Tone.Transport.cancel(scheduleId);
            this.schedules.get(instrument)?.delete(beatIndex);
        }
    }

    clearSchedule(): void {
        this.schedules.forEach(beatMap => {
            beatMap.forEach(scheduleId => {
                Tone.Transport.cancel(scheduleId);
            });
        });
        this.schedules = new Map();
    }

    start(): void {
        Tone.start();
        Tone.Transport.start();
    }

    stop(): void {
        Tone.Transport.stop();
    }

    setTempo(bpm: number): void {
        /**
         * We use higher internal tempo to get more temporal resolution.
         * Currently, the smallest subdivision in tonejs is a 256th note.
         * This allows us to get down to a 1024th note.
         *
         * Probably overkill as Dilla himself was constrained by the MPC 3000
         * which I doubt even supported down to a 256th note.
         */
        Tone.Transport.bpm.value = bpm * 4;
    }
}

export default new Playback();
