import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-report-game',
  templateUrl: './report-game.component.html',
  styleUrls: ['./report-game.component.scss']
})
export class ReportGameComponent implements OnInit, OnDestroy {

  constructor(private breadService: BreadcrumbService) {
    this.breadService.doOneBread('Отчет по играм');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

}
