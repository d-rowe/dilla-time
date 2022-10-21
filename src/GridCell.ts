export default class GridCell {
    declare element: HTMLDivElement;

    constructor(
        rowContainer: HTMLSpanElement,
        width: number,
        rowIndex: number,
        colIndex: number,
    ) {
        this.element = document.createElement('div');
        this.element.classList.add('grid-cell');
        this.element.setAttribute('data-cell-id', `${rowIndex}:${colIndex}`);
        this.setWidth(width);
        rowContainer.append(this.element);
    }

    setWidth(width: number): void {
        this.element.style.width = width.toString() + 'px';
    }
}
