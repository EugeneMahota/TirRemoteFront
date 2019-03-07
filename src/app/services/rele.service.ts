import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Rele} from '../models/rele';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ReleService {

  listRele: Rele[] = [];
  constructor(private http: HttpClient) {
  }

  getListRele(): Observable<Rele[]> {
    return this.http.get(environment.apiUrl + '/rele', httpHeaders)
      .pipe(map(res => {
        this.listRele = [].slice.call(res['data']);
        return this.listRele = this.listRele.map(function (data: any) {
          return {
            id: data.rele_id,
            name: data.name
          };
        });
      }));
  }

  getRele(id: number): Rele {
    return this.listRele.find(x => x.id === id);
  }

  postRele(rele: Rele): Observable<any> {
    return this.http.post(environment.apiUrl + '/rele', JSON.stringify(rele), httpHeaders);
  }

  putRele(rele: Rele): Observable<any> {
    return this.http.put(environment.apiUrl + '/rele/' + rele.id, JSON.stringify(rele), httpHeaders);
  }

  deleteRele(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/rele/' + id, httpHeaders);
  }
}
