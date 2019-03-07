import {Component, OnDestroy, OnInit} from '@angular/core';
import {GunService} from '../../../services/gun.service';
import {Gun} from '../../../models/gun';
import {BreadcrumbService} from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-list-gun',
  templateUrl: './list-gun.component.html',
  styleUrls: ['./list-gun.component.css']
})
export class ListGunComponent implements OnInit, OnDestroy {

  itemGun: Gun = new Gun();
  listGun: Gun[] = [];

  constructor(private gunService: GunService, private breadService: BreadcrumbService) {
    this.breadService.doOneBread('Ружья');
  }

  ngOnInit() {
    this.gunService.getListGun().subscribe(res => {
      this.listGun = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  deleteGun() {
    this.gunService.delGun(this.itemGun.id, this.itemGun.image, this.itemGun.audio).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
