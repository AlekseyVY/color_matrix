import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { GameService } from "../../services/game.service";
import { StateToColor } from "./cell.component.model";


@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrl: './cell.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {
    public readonly cellState = input.required<number>();
    public readonly coord = input.required<[number, number]>();

    private gameService = inject(GameService);

    protected colorState = computed(() => StateToColor[this.cellState()]);

    protected onClickhandler(): void {
        const [row, col] = this.coord();
        this.gameService.toggleCellState(row, col);
    }
}