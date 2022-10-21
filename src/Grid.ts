import GridRow from './GridRow';

export default class Grid {
    declare element: HTMLDivElement;
    declare rows: GridRow[];
    declare private isMouseDown: boolean;

    constructor(gridContainer: HTMLSpanElement, data: number[][]) {
        this.isMouseDown = false;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.element = document.createElement('div');
        this.element.addEventListener('mousedown', this.onMouseDown);
        this.element.addEventListener('mouseup', this.onMouseUp);
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.classList.add('grid');
        this.rows = data.map((row, rowIndex) => new GridRow(
            this.element,
            row,
            rowIndex,
        ));
        gridContainer.append(this.element);
    }

    private onMouseDown(e: MouseEvent): void {
        this.isMouseDown = true;
        const {target} = e;
        if (!(target instanceof HTMLDivElement)) {
            return;
        }
        this.toggleCellState(target);
    }

    private onMouseUp() {
        this.isMouseDown = false;
    }

    private onMouseMove(e: MouseEvent) {
        const {target} = e;
        if (!this.isMouseDown || !(target instanceof HTMLDivElement)) {
            return;
        }

        target.classList.add('active');
    }

    private toggleCellState(cellElement: HTMLElement) {
        if (cellElement.classList.contains('active')) {
            cellElement.classList.remove('active');
        } else {
            cellElement.classList.add('active');
        }
    }

    setGrid(grid: number[][]) {
        this.rows.forEach((row, i) => {
            row.setWidths(grid[i]);
        });
    }

    dispose(): void {
        this.element.removeEventListener('mousedown', this.onMouseDown);
        this.element.remove();
    }
}
