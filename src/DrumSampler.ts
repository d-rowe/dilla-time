import {Sampler} from 'tone';
import { INSTRUMENT } from './constants';

const INSTRUMENT_NOTE_MAP: Record<INSTRUMENT, string> = {
    // these notes are arbitrary
    [INSTRUMENT.KICK]: 'C1',
    [INSTRUMENT.SNARE]: 'D1',
    [INSTRUMENT.HIHAT]: 'E1',
}
// TODO: compress all these samples, as they're way too big for mobile data right now
const FILE_TYPE = 'wav';

export default class DrumSampler {
    declare load: Promise<void>;
    declare loaded: boolean;
    declare private sampler: Sampler;

    constructor() {
        this.loaded = false;
        this.load = new Promise(resolve => {
            this.sampler = new Sampler({
                urls: {
                    [INSTRUMENT_NOTE_MAP.KICK]: getFileName('kick'),
                    [INSTRUMENT_NOTE_MAP.HIHAT]: getFileName('hat'),
                },
                baseUrl: window.location.href,
                onload: resolve
            }).toDestination();
        });
    }

    trigger(instrument: INSTRUMENT): void {
        this.sampler.triggerAttack(INSTRUMENT_NOTE_MAP[instrument])
    }
}

function getFileName(baseName: string): string {
    return `${baseName}.${FILE_TYPE}`;
}