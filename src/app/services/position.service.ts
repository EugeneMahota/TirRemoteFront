import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PositionSettings} from '../models/position-settings';
import {TypeGame} from '../models/type-game';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  listPosition: PositionSettings[] = [];
  listTypeGame: TypeGame[] = [];

  constructor(private http: HttpClient) {
  }

  getListPosition(): Observable<PositionSettings[]> {
    return this.http.get(environment.apiUrl + '/position', httpHeaders)
      .pipe(map(res => {
        this.listPosition = [].slice.call(res['data']);
        return this.listPosition = this.listPosition.map(function (data: any) {
          return {
            id: data.game_id,
            type: data.type_game_id
          };
        });
      }));
  }

  getListTypeGame(): Observable<TypeGame[]> {
    return this.http.get(environment.apiUrl + '/position/type-game', httpHeaders)
      .pipe(map(res => {
        this.listTypeGame = [].slice.call(res['data']);
        return this.listTypeGame = this.listTypeGame.map(function (data: any) {
          return {
            id: data.type_game_id,
            name: data.name
          };
        });
      }));
  }

  getPosition(id: number): PositionSettings {
    return this.listPosition.find(x => x.id === id);
  }

  postPosition(position: PositionSettings): Observable<any> {
    return this.http.post(environment.apiUrl + '/position', JSON.stringify(position), httpHeaders);
  }

  putPosition(position: PositionSettings, id: number): Observable<any> {
    return this.http.put(environment.apiUrl + '/position/' + id, JSON.stringify(position), httpHeaders);
  }

  deletePosition(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/position/' + id, httpHeaders);
  }
}
