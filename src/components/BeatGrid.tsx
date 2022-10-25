import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectBeat, toggleNote } from '../slices/beatSlice';

import type { RootState } from '../app/store';
import type { Beat } from '../types/beatTypes';
import { useAppDispatch } from '../app/hooks';
import Playback from '../lib/Playback';

type Props = {
    beat: Beat,
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const InstrumentRow = styled.div`
    display: flex;
    height: 100px;
`;

const Cell = styled.div`
    border: 1px solid black;
    height: 100%;
    transition: all 100ms ease-in-out;

    &.active {
        background-color: red;
    }
`;

function BeatGrid(props: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        Playback.scheduleBeat(props.beat);
    }, [props.beat]);

    return (
        <Wrapper>
            {props.beat.instruments.map((instrument, instrumentIndex) => (
                <InstrumentRow key={instrumentIndex}>
                    {instrument.notes.map((note, beatIndex) => (
                        <Cell
                            key={beatIndex}
                            style={{width: `${note.duration}%`}}
                            className={note.active ? 'active' : undefined}
                            onClick={() => dispatch(toggleNote({instrumentIndex, beatIndex}))}
                        />
                    ))}
                </InstrumentRow>
            ))}
        </Wrapper>
    );
}

function mapStateToProps(state: RootState) {
    return { beat: selectBeat(state) };
}

export default connect(mapStateToProps)(React.memo(BeatGrid));
