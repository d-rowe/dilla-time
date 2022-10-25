import React, { useState, useEffect } from 'react';
import Playback from '../lib/Playback';

export default function Playbar() {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        Playback.initialize();
    }, []);

    function onClick() {
        isPlaying
            ? Playback.stop()
            : Playback.start();

        setIsPlaying(!isPlaying);
    }

    return (
        <button onClick={onClick}>
            {isPlaying ? '⏹' : '▶️'}
        </button>
    );
}
