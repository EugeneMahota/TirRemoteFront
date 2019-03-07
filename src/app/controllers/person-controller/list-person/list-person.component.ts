import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {Person} from '../../../models/person';
import {PersonService} from '../../../services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit, OnDestroy {

  itemPerson: Person = new Person();
  listPerson: Person[] = [];

  constructor(private breadService: BreadcrumbService, private personService: PersonService) {
    this.breadService.doOneBread('Операторы');
  }

  ngOnInit() {
    this.personService.getListPerson().subscribe(res => {
      this.listPerson = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  deletePerson() {
    this.personService.delPerson(this.itemPerson.id).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
