import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TypeGame} from '../../../models/type-game';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {PositionService} from '../../../services/position.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PositionSettings} from '../../../models/position-settings';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit, OnDestroy {

  id: number;
  itemPosition: PositionSettings = new PositionSettings();
  positionForm: FormGroup;
  listTypeGame: TypeGame[] = [];

  constructor(private breadService: BreadcrumbService,
              private positionService: PositionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.breadService.doOneBread('Позиционирование');
    this.breadService.doTwoBread('Редактировать');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.positionService.getPosition(this.id)) {
      this.itemPosition = this.positionService.getPosition(this.id);
    } else {
      this.router.navigate(['dashboard', 'position']);
    }
    this.getListTypeGame();
    this.initPositionForm();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initPositionForm() {
    this.positionForm = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      type: [this.itemPosition.type, [Validators.required]]
    });
  }

  editPosition(position: PositionSettings) {
    this.positionService.putPosition(position, this.id).subscribe(res => {
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
