import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {Person} from '../../../models/person';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../../services/person.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit, OnDestroy {

  id: number;
  itemPerson: Person = new Person();
  personForm: FormGroup;

  constructor(private breadService: BreadcrumbService,
              private formBuilder: FormBuilder,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router) {
    this.breadService.doOneBread('Операторы');
    this.breadService.doTwoBread('Редактировать');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.personService.getPerson(this.id)) {
      this.itemPerson = this.personService.getPerson(this.id);
    } else {
      this.router.navigate(['dashboard', 'person']);
    }

    this.initPerson();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initPerson() {
    this.personForm = this.formBuilder.group({
      id: [this.itemPerson.id],
      name: [this.itemPerson.name, [Validators.required, Validators.minLength(3), Validators.pattern(/[А-я]/)]],
      code_card: [this.itemPerson.code_card, [Validators.required]]
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

  editPerson(person: Person) {
    this.personService.putPerson(person).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard', 'person']);
      }
    });
  }
}
