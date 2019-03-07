import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {Souvenir} from '../../../models/souvenir';
import {SouvenirService} from '../../../services/souvenir.service';

@Component({
  selector: 'app-list-souvenir',
  templateUrl: './list-souvenir.component.html',
  styleUrls: ['./list-souvenir.component.css']
})
export class ListSouvenirComponent implements OnInit, OnDestroy {

  listSouvenir: Souvenir[] = [];
  itemSouvenir: Souvenir = new Souvenir();

  constructor(private breadService: BreadcrumbService,
              private souvenirService: SouvenirService) {
    this.breadService.doOneBread('Сувениры');
  }

  ngOnInit() {
    this.souvenirService.getListSouvenir().subscribe(res => {
      this.listSouvenir = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  delSouvenir() {
    this.souvenirService.deleteSouvenir(this.itemSouvenir.id).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
