import {Component, OnDestroy, OnInit} from '@angular/core';
import {PositionSettings} from '../../../models/position-settings';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {PositionService} from '../../../services/position.service';
import {TypeGame} from '../../../models/type-game';

@Component({
  selector: 'app-list-position',
  templateUrl: './list-position.component.html',
  styleUrls: ['./list-position.component.scss']
})
export class ListPositionComponent implements OnInit, OnDestroy {

  itemPosition: PositionSettings = new PositionSettings();
  listPosition: PositionSettings[] = [];
  listTypeGame: TypeGame[] = [];

  constructor(private breadService: BreadcrumbService, private positionService: PositionService) {
    this.breadService.doOneBread('Позиционирование');
  }

  ngOnInit() {
    this.positionService.getListPosition().subscribe(res => {
      this.listPosition = res;
    });

    this.getListTypeGame();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  delPosition() {
    this.positionService.deletePosition(this.itemPosition.id).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

  getListTypeGame() {
    this.positionService.getListTypeGame().subscribe(res => {
      this.listTypeGame = res;
    });
  }

}
