import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameTir} from '../../../models/game-tir';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {GameTirService} from '../../../services/game-tir.service';

@Component({
  selector: 'app-list-game-tir',
  templateUrl: './list-game-tir.component.html',
  styleUrls: ['./list-game-tir.component.scss']
})
export class ListGameTirComponent implements OnInit, OnDestroy {

  listGameTir: GameTir[] = [];
  itemGameTir: GameTir = new GameTir();

  constructor(private breadService: BreadcrumbService, private gameService: GameTirService) {
    this.breadService.doOneBread('Игры тира');
  }

  ngOnInit() {
    this.gameService.getListGame().subscribe(res => {
      this.listGameTir = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  delGame() {
    this.gameService.deleteGame(this.itemGameTir).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
