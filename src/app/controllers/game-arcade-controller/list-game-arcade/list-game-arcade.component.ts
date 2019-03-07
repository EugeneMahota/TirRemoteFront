import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameArcade} from '../../../models/game-arcade';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {GameArcadeService} from '../../../services/game-arcade.service';

@Component({
  selector: 'app-list-game-arcade',
  templateUrl: './list-game-arcade.component.html',
  styleUrls: ['./list-game-arcade.component.scss']
})
export class ListGameArcadeComponent implements OnInit, OnDestroy {

  itemGame: GameArcade = new GameArcade();
  listGame: GameArcade[] = [];

  constructor(private breadService: BreadcrumbService, private gameService: GameArcadeService) {
    this.breadService.doOneBread('Аркадные игры');
  }

  ngOnInit() {
    this.gameService.getListGame().subscribe(res => {
      this.listGame = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  deleteGame() {
    this.gameService.delGame(this.itemGame).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
