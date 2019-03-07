import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Souvenir} from '../models/souvenir';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class SouvenirService {

  listSouvenir: Souvenir[] = [];

  constructor(private http: HttpClient) {
  }

  getListSouvenir(): Observable<Souvenir[]> {
    return this.http.get(environment.apiUrl + '/souvenir', httpHeaders)
      .pipe(map(res => {
        this.listSouvenir = [].slice.call(res['data']);
        return this.listSouvenir = this.listSouvenir.map(function (data: any) {
          return {
            id: data.type_souvenir_id,
            name: data.name,
            quant: data.quant,
          };
        });
      }));
  }

  getSouvenir(id: number): Souvenir {
    return this.listSouvenir.find(x => x.id === id);
  }

  postSouvenir(souvenir: Souvenir): Observable<any> {
    return this.http.post(environment.apiUrl + '/souvenir', JSON.stringify(souvenir), httpHeaders);
  }

  putSouvenir(souvenir: Souvenir): Observable<any> {
    return this.http.put(environment.apiUrl + '/souvenir/' + souvenir.id, JSON.stringify(souvenir), httpHeaders);
  }

  deleteSouvenir(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/souvenir/' + id, httpHeaders);
  }
}
