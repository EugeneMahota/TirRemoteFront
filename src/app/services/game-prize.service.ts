import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GamePrize} from '../models/game-prize';
import {Position} from '../models/position';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class GamePrizeService {

  listGame: GamePrize[] = [];
  listPosition: Position[] = [];

  constructor(private http: HttpClient) {
  }

  getListGame(): Observable<GamePrize[]> {
    return this.http.get(environment.apiUrl + '/game-prize', httpHeaders)
      .pipe(map(res => {
        this.listGame = [].slice.call(res['data']);
        return this.listGame = this.listGame.map(function (data: any) {
          return {
            id: data.game_prize_id,
            souvenirId: data.type_souvenir_id,
            positionId: data.game_id,
            name: data.name,
            price: data.price
          };
        });
      }));
  }

  getListPosition(): Observable<Position[]> {
    return this.http.get(environment.apiUrl + '/game-prize/position', httpHeaders)
      .pipe(map(res => {
        this.listPosition = [].slice.call(res['data']);
        return this.listPosition = this.listPosition.map(function (data: any) {
          return {
            id: data.game_id,
            name: data.name,
            status: data.status
          };
        });
      }));
  }

  getGame(id: number): GamePrize {
    return this.listGame.find(x => x.id === id);
  }

  postGame(game: GamePrize): Observable<any> {
    return this.http.post(environment.apiUrl + '/game-prize', JSON.stringify(game), httpHeaders);
  }

  putGame(game: GamePrize): Observable<any> {
    return this.http.put(environment.apiUrl + '/game-prize/' + game.id, JSON.stringify(game), httpHeaders);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/game-prize/' + id, httpHeaders);
  }
}
