import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GameArcade} from '../models/game-arcade';
import {Position} from '../models/position';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Accept': 'multipart/form-data; boundary'})};

@Injectable({
  providedIn: 'root'
})
export class GameArcadeService {

  listGame: GameArcade[] = [];
  listPosition: Position[] = [];
  constructor(private http: HttpClient) {
  }

  getListGame(): Observable<GameArcade[]> {
    return this.http.get(environment.apiUrl + '/game-arcade')
      .pipe(map(res => {
        this.listGame = [].slice.call(res['data']);
        return this.listGame = this.listGame.map(function (data: any) {
          return {
            id: data.game_arcade_id,
            game_id: data.game_id,
            rele_start_id: data.rele_start_id,
            rele_end_id: data.rele_end_id,
            camera_start_id: data.camera_start_id,
            camera_end_id: data.camera_end_id,
            camera_multi_photo_id: data.camera_multi_photo_id,
            type_souvenir_id: data.type_souvenir_id,
            name: data.name,
            price: data.price,
            image: data.image,
            lasting_rele_start: data.lasting_rele_start,
            lasting_rele_end: data.lasting_rele_end,
            fl_display: data.fl_display,
            audio_start: data.audio_start,
            audio_end: data.audio_end,
            quant_photo: data.quant_photo,
            interval_photo: data.interval_photo,
            lasting_game: data.lasting_game,
            min_lasting_game: data.min_lasting_game
          };
        });
      }));
  }

  getGame(id: number): GameArcade {
    return this.listGame.find(x => x.id === id);
  }

  postGame(image: File, audioStart: File, audioEnd: File, game: GameArcade): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('audio_start', audioStart);
    formData.append('audio_end', audioEnd);
    formData.append('game', JSON.stringify(game));

    return this.http.post(environment.apiUrl + '/game-arcade', formData, httpHeaders);
  }

  putGame(image: File, audioStart: File, audioEnd: File, game: GameArcade): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('audio_start', audioStart);
    formData.append('audio_end', audioEnd);
    formData.append('game', JSON.stringify(game));

    return this.http.put(environment.apiUrl + '/game-arcade/' + game.id, formData, httpHeaders);
  }

  delGame(game: GameArcade): Observable<any> {
    return this.http.delete(environment.apiUrl + '/game-arcade/' + game.id + '?image=' + game.image +
                                                                                  '&audio_start=' + game.audio_start +
                                                                                  '&audio_end=' + game.audio_end);
  }

  getListPosition(): Observable<Position[]> {
    return this.http.get(environment.apiUrl + '/game-arcade/position')
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
}
