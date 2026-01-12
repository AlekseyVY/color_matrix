import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { GameService } from "../../services/game.service";
import { CellComponent } from "../cell/cell.component";



@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    imports: [CellComponent],
    providers: [GameService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
    private readonly gameService = inject(GameService);
    protected readonly matrix = computed(() => this.gameService.matrix());

    protected onClickHandler(): void {
        this.gameService.resetMatrix();
    }
}