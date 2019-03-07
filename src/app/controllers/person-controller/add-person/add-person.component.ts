import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {PersonService} from '../../../services/person.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../models/person';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit, OnDestroy {

  personForm: FormGroup;

  constructor(private breadService: BreadcrumbService,
              private personService: PersonService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.breadService.doOneBread('Операторы');
    this.breadService.doTwoBread('Добавить');
  }

  ngOnInit() {
    this.initPersonForm();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initPersonForm() {
    this.personForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[А-я]/)]],
      login: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-z]/)]],
      code_card: ['', [Validators.required]],
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/[0-9]/)]]
    });
  }

  InvalidPerson(name: string) {
    const controls = this.personForm.controls[name];
    const result = controls.invalid && controls.touched;

    return result;
  }

  ValidPerson(name: string) {
    const controls = this.personForm.controls[name];
    const result = controls.valid && controls.touched;

    return result;
  }

  addPerson(person: Person) {
    this.personService.postPerson(person).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'person']);
      }
    });
  }
}
