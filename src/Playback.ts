import * as Tone from 'tone';
import { INSTRUMENT } from './constants';
import DrumSampler from './DrumSampler';

const LOOP_DURATION = '2:0:0';

export default class Playback {
    declare private drumSampler: DrumSampler;
    declare private schedules: Map<INSTRUMENT, Map<number, number>>;

    constructor() {
        this.drumSampler = new DrumSampler();
        this.schedules = new Map();
    }

    scheduleNote(instrument: INSTRUMENT, beatIndex: number, tick: number): void  {
        if (!this.schedules.get(instrument)?.get(beatIndex)) {
            const beatMap = new Map();
            beatMap.set(beatIndex, -1);
            this.schedules.set(instrument, beatMap);
        }
        const existingScheduleId = this.schedules.get(instrument)?.get(beatIndex);
        if (existingScheduleId && existingScheduleId !== -1) {
            Tone.Transport.cancel(existingScheduleId);
            return;
        }
        // 256 ticks in a beat (1024 per measure)
        const tickTime = Tone.Time({'256n': tick}).valueOf();
        const newScheduleId = Tone.Transport.scheduleRepeat(() => {
            this.drumSampler.trigger(instrument);
        }, LOOP_DURATION, tickTime);

        this.schedules.get(instrument)?.set(beatIndex, newScheduleId);
    }

    clearSchedule(): void {
        // TODO: implement clearing all scheduled notes
    }

    start(): void {
        Tone.start();
        Tone.Transport.start();
        this.scheduleNote(INSTRUMENT.KICK, 1, 1030);
    }
}
