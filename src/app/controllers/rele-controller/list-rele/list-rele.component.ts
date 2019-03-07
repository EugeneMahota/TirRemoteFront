import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {ReleService} from '../../../services/rele.service';
import {Rele} from '../../../models/rele';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-rele',
  templateUrl: './list-rele.component.html',
  styleUrls: ['./list-rele.component.scss']
})
export class ListReleComponent implements OnInit, OnDestroy {

  listRele: Rele[] = [];
  itemRele: Rele = new Rele();

  addReleForm: FormGroup;
  editReleForm: FormGroup;

  constructor(private breadService: BreadcrumbService,
              private releService: ReleService,
              private formBuilder: FormBuilder) {
    this.breadService.doOneBread('Реле');
  }

  ngOnInit() {
    this.releService.getListRele().subscribe(res => {
      this.listRele = res;
    });
    this.initAddForm();
    this.initEditForm();
  }

  initAddForm() {
    this.addReleForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  initEditForm() {
    this.editReleForm = this.formBuilder.group({
      id: [this.itemRele.id, []],
      name: [this.itemRele.name, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  deleteRele() {
    this.releService.deleteRele(this.itemRele.id).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

  addRele(rele: Rele) {
    this.releService.postRele(rele).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

  editRele(rele: Rele) {
    this.releService.putRele(rele).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
