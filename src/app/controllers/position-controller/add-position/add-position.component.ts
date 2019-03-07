import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {PositionService} from '../../../services/position.service';
import {Router} from '@angular/router';
import {TypeGame} from '../../../models/type-game';
import {PositionSettings} from '../../../models/position-settings';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent implements OnInit, OnDestroy {

  positionForm: FormGroup;

  listTypeGame: TypeGame[] = [];

  constructor(private breadService: BreadcrumbService,
              private positionService: PositionService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.breadService.doOneBread('Позиционирование');
    this.breadService.doTwoBread('Добавить');
  }

  ngOnInit() {
    this.getListTypeGame();
    this.initPositionForm();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initPositionForm() {
    this.positionForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  addPosition(position: PositionSettings) {
    this.positionService.postPosition(position).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'position']);
      }
    });
  }

  getListTypeGame() {
    this.positionService.getListTypeGame().subscribe(res => {
      this.listTypeGame = res;
    });
  }
}
