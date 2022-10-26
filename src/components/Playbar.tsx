import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import Playback from '../lib/Playback';
import { setStraight, setSwing, setDilla } from '../slices/beatSlice';

export default function Playbar() {
    const [isPlaying, setIsPlaying] = useState(false);
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

    function onStraightClick() {
        dispatch(setStraight())
    }

    function onSwingClick() {
        dispatch(setSwing())
    }

    function onDillaClick() {
        dispatch(setDilla())
    }

    return (
        <div>
            <button onClick={onPlayClick}>
                {isPlaying ? '⏹' : '▶️'}
            </button>
            <button onClick={onStraightClick}>
                straight
            </button>
            <button onClick={onSwingClick}>
                swing
            </button>
            <button onClick={onDillaClick}>
                dilla
            </button>
        </div>
    );
}
