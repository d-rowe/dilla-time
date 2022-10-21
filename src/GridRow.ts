import GridCell from './GridCell';

export default class GridRow {
    declare element: HTMLDivElement;
    declare cells: GridCell[];

    constructor(gridContainer: HTMLSpanElement, widths: number[], rowIndex: number) {
        this.element = document.createElement('div');
        this.element.classList.add('grid-row');
        this.cells = widths.map((w, colIndex) => new GridCell(
            this.element,
            w,
            rowIndex,
            colIndex,
        ));
        gridContainer.append(this.element);
    }

    setWidths(widths: number[]): void {
        this.cells.forEach((c, i) => c.setWidth(widths[i]));
    }
}
