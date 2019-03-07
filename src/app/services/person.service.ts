import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Person} from '../models/person';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  listPerson: Person[] = [];

  constructor(private http: HttpClient) {
  }

  getListPerson(): Observable<Person[]> {
    return this.http.get(environment.apiUrl + '/person', httpHeaders)
      .pipe(map(res => {
        this.listPerson = [].slice.call(res['data']);
        return this.listPerson = this.listPerson.map(function (data: any) {
          return {
            id: data.person_id,
            name: data.name,
            login: data.login,
            code_card: data.code_card,
            pin: 0
          };
        });
      }));
  }

  getPerson(id: number): Person {
    return this.listPerson.find(x => x.id === id);
  }

  postPerson(person: Person): Observable<any> {
    return this.http.post(environment.apiUrl + '/person', JSON.stringify(person), httpHeaders);
  }

  putPerson(person: Person): Observable<any> {
    return this.http.put(environment.apiUrl + '/person/' + person.id, JSON.stringify(person), httpHeaders);
  }

  delPerson(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/person/' + id, httpHeaders);
  }
}
