import {Component, OnDestroy, OnInit} from '@angular/core';
import {Souvenir} from '../../../models/souvenir';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {SouvenirService} from '../../../services/souvenir.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-souvenir',
  templateUrl: './add-souvenir.component.html',
  styleUrls: ['./add-souvenir.component.css']
})
export class AddSouvenirComponent implements OnInit, OnDestroy {

  souvenirForm: FormGroup;
  constructor(private breadService: BreadcrumbService,
              private formBuilder: FormBuilder,
              private router: Router,
              private souvenirService: SouvenirService) {
    this.breadService.doOneBread('Сувениры');
    this.breadService.doTwoBread('Добавить');
  }

  ngOnInit() {
    this.iniFormSouvenir();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  iniFormSouvenir() {
    this.souvenirForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      quant: ['', [Validators.required]]
    });
  }

  addSouvenir(souvenir: Souvenir) {
    this.souvenirService.postSouvenir(souvenir).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'souvenir']);
      }
    });
  }

}
