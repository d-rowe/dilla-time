import playback from './Playback';
import Grid from './Grid';
import {straightGrid, swingGrid} from './Score';
import drumSampler from './DrumSampler';

const container = document.getElementById('root');
if (!container) {
    throw new Error('No container');
}


const gridView = new Grid(container, straightGrid);
drumSampler.load().then(() => console.log('Sampler loaded'));
document.body.onclick = () => playback.start();

let isStraight = true;
setInterval(() => {
    const grid = isStraight ? swingGrid : straightGrid;
    gridView.setGrid(grid);
    isStraight = !isStraight;
}, 2000);
