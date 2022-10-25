import * as Tone from 'tone';
import { Beat } from '../types/beatTypes';
import drumSampler from './DrumSampler';

const LOOP_DURATION = '4:0:0';
// Seems like Dilla was draw to tempos around 100bpm most of the time
const DEFAULT_BPM = 100;

class Playback {
    private activeScheduleIds: Set<number> = new Set();

    constructor() {
        this.setTempo(DEFAULT_BPM);
    }

    initialize() {
        drumSampler.load();
    }

    scheduleBeat(beat: Beat) {
        const { bpm, instruments } = beat;

        this.clearSchedule();
        this.setTempo(bpm);

        instruments.forEach((instrument, i) => {
            let currentTick = 0;

            instrument.notes.forEach(note => {
                if (note.active) {
                    const tickTime = Tone.Time({ '256n': currentTick }).valueOf();
                    const scheduleId = Tone.Transport.scheduleRepeat(time => {
                        drumSampler.trigger(instrument.name, time);
                    }, LOOP_DURATION, tickTime);

                    this.activeScheduleIds.add(scheduleId);
                }

                currentTick += note.duration;
            });

            currentTick = 0;
        });
    }

    clearSchedule() {
        this.activeScheduleIds.forEach(sId => {
            Tone.Transport.clear(sId)
        });
        this.activeScheduleIds.clear();
    }

    start(): void {
        Tone.start();
        Tone.Transport.start();
    }

    stop(): void {
        Tone.Transport.stop();
    }

    setTempo(bpm: number): void {
        Tone.Transport.bpm.value = bpm * 4;
    }
}

export default new Playback();
