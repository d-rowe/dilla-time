import { Sampler } from 'tone';
import { INSTRUMENT } from './constants';

const INSTRUMENT_NOTE_MAP: Record<INSTRUMENT, string> = {
    // these notes are arbitrary
    [INSTRUMENT.KICK]: 'C1',
    [INSTRUMENT.SNARE]: 'D1',
    [INSTRUMENT.HIHAT]: 'E1',
    [INSTRUMENT.CLAP]: 'F1',
}
const FILE_TYPE = 'mp3';
const SAMPLES_ENDPOINT = `${location.href.replace(/\/+$/, '')}/samples/`;

class DrumSampler {
    declare private sampler: Sampler;

    async load(): Promise<void> {
        if (this.sampler && this.sampler.loaded) {
            return Promise.resolve();
        }

        return new Promise(resolve => {
            this.sampler = new Sampler({
                urls: {
                    [INSTRUMENT_NOTE_MAP.KICK]: getFileName('kick'),
                    [INSTRUMENT_NOTE_MAP.HIHAT]: getFileName('hat'),
                    [INSTRUMENT_NOTE_MAP.SNARE]: getFileName('snare'),
                    [INSTRUMENT_NOTE_MAP.CLAP]: getFileName('clap'),
                },
                baseUrl: SAMPLES_ENDPOINT,
                onload: resolve,
            }).toDestination();
        });
    }

    trigger(instrument: INSTRUMENT, time?: number): void {
        if (!this.sampler || !this.sampler.loaded) {
            throw new Error('Cannot play not before sampler is loaded');
        }

        this.sampler.triggerAttack(
            INSTRUMENT_NOTE_MAP[instrument],
            time
        );
    }
}

function getFileName(baseName: string): string {
    return `${baseName}.${FILE_TYPE}`;
}

export default new DrumSampler();
