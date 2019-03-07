import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private breadService: BreadcrumbService) {
    this.breadService.doOneBread('Главная');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

}
