import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SouvenirService} from '../../../services/souvenir.service';
import {Souvenir} from '../../../models/souvenir';

@Component({
  selector: 'app-edit-souvenir',
  templateUrl: './edit-souvenir.component.html',
  styleUrls: ['./edit-souvenir.component.scss']
})
export class EditSouvenirComponent implements OnInit, OnDestroy {

  id: number;
  itemSouvenir: Souvenir = new Souvenir();
  souvenirForm: FormGroup;

  constructor(private breadService: BreadcrumbService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private souvenirService: SouvenirService) {
    this.breadService.doOneBread('Сувениры');
    this.breadService.doTwoBread('Редактировать');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.souvenirService.getSouvenir(this.id)) {
      this.itemSouvenir = this.souvenirService.getSouvenir(this.id);
    } else {
      this.router.navigate(['dashboard', 'souvenir']);
    }

    this.iniFormSouvenir();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  iniFormSouvenir() {
    this.souvenirForm = this.formBuilder.group({
      id: [this.itemSouvenir.id],
      name: [this.itemSouvenir.name, [Validators.required, Validators.minLength(3)]],
      quant: [this.itemSouvenir.quant, [Validators.required]]
    });
  }

  editSouvenir(souvenir: Souvenir) {
    this.souvenirService.putSouvenir(souvenir).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'souvenir']);
      }
    });
  }

}
