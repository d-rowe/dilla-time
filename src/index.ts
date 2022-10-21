import Playback from './Playback';
import Grid from './Grid';
import {straightGrid, swingGrid} from './Score';

const container = document.getElementById('root');
if (!container) {
    throw new Error('No container');
}


const gridView = new Grid(container, straightGrid);
setTimeout(() => {
    const playback = new Playback();
    document.body.onclick = () => playback.start();
}, 1500);

let isStraight = true;
setInterval(() => {
    const grid = isStraight ? swingGrid : straightGrid;
    gridView.setGrid(grid);
    isStraight = !isStraight;
}, 2000);
