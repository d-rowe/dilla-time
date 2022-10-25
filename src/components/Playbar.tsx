import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import Playback from '../lib/Playback';
import { setStraight, setSwing } from '../slices/beatSlice';

export default function Playbar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSwing, setIsSwing] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        Playback.initialize();
    }, []);

    function onPlayClick() {
        isPlaying
            ? Playback.stop()
            : Playback.start();

        setIsPlaying(!isPlaying);
    }

    function onTimeClick() {
        isSwing
            ? dispatch(setStraight())
            : dispatch(setSwing());

        setIsSwing(!isSwing);
    }

    return (
        <div>
            <button onClick={onPlayClick}>
                {isPlaying ? '⏹' : '▶️'}
            </button>
            <button onClick={onTimeClick}>
                {isSwing ? 'swing' : 'straight'}
            </button>
        </div>
    );
}
