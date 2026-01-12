import { Injectable, signal } from "@angular/core";

@Injectable()
export class GameService {
    private readonly size = 10;
    private _matrix = signal<number[][]>(this.createMatrix(this.size))
    public matrix = this._matrix.asReadonly();

    private readonly directions = [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    private createMatrix(size: number) {
        return Array.from({ length: size }, () => Array(size).fill(0))
    }

    private isValid(row: number, col: number): boolean {
        return row >= 0 && 
            row < this._matrix().length && 
            col >= 0 && 
            col < this._matrix()[row].length;
    };
    
    public toggleCellState(row: number, col: number): void {
        this._matrix.update((current) => {
            const newMatrix = current.map((row) => [...row]);
            
            for(const direction of this.directions) {
                const [dx, dy] = direction;
                const x = row + dx;
                const y = col + dy;
                if(this.isValid(x, y)) {
                    newMatrix[x][y] = newMatrix[x][y] ^ 1;
                }
            }

            return newMatrix;
        })
    }

    public resetMatrix(): void {
        this._matrix.set(this.createMatrix(this.size))
    }
}