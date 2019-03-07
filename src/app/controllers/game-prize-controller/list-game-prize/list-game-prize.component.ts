import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamePrize} from '../../../models/game-prize';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {GamePrizeService} from '../../../services/game-prize.service';

@Component({
  selector: 'app-list-game-prize',
  templateUrl: './list-game-prize.component.html',
  styleUrls: ['./list-game-prize.component.scss']
})
export class ListGamePrizeComponent implements OnInit, OnDestroy {

  itemGame: GamePrize = new GamePrize();
  listGame: GamePrize[] = [];

  constructor(private breadService: BreadcrumbService, private gameService: GamePrizeService) {
    this.breadService.doOneBread('Призовые игры');
  }

  ngOnInit() {
    this.gameService.getListGame().subscribe(res => {
      this.listGame = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  delGame() {
    this.gameService.deleteGame(this.itemGame.id).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
