import {Injectable} from '@angular/core';
import {GameTir} from '../models/game-tir';
import {Position} from '../models/position';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Accept': 'multipart/form-data; boundary'})};

@Injectable({
  providedIn: 'root'
})
export class GameTirService {

  listGameTir: GameTir[] = [];
  listPosition: Position[] = [];
  constructor(private http: HttpClient) {
  }

  getListGame(): Observable<GameTir[]> {
    return this.http.get(environment.apiUrl + '/game-tir', httpHeaders)
      .pipe(map(res => {
        this.listGameTir = [].slice.call(res['data']);
        return this.listGameTir = this.listGameTir.map(function (data: any) {
          return {
            id: data.game_tir_id,
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
            lasting_game: data.lasting_game,
            lasting_rele_start: data.lasting_rele_start,
            lasting_rele_end: data.lasting_rele_end,
            fl_display: data.fl_display,
            shots: data.shots,
            miss_shots: data.miss_shots,
            audio_start: data.audio_start,
            audio_end: data.audio_end,
            quant_photo: data.quant_photo,
            interval_photo: data.interval_photo,
            timeout_autocancel: data.timeout_autocancel
          };
        });
      }));
  }

  getGame(id: number): GameTir {
    return this.listGameTir.find(x => x.id === id);
  }

  postGame(audioStart: File, audioEnd: File, image: File, gameTir: GameTir): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('audio_start', audioStart);
    formData.append('audio_end', audioEnd);
    formData.append('image', image);
    formData.append('gameTir', JSON.stringify(gameTir));

    return this.http.post(environment.apiUrl + '/game-tir', formData, httpHeaders);
  }

  putGame(audioStart: File, audioEnd: File, image: File, gameTir: GameTir): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('audio_start', audioStart);
    formData.append('audio_end', audioEnd);
    formData.append('image', image);
    formData.append('gameTir', JSON.stringify(gameTir));

    return this.http.put(environment.apiUrl + '/game-tir/' + gameTir.id, formData, httpHeaders);
  }

  deleteGame(game: GameTir): Observable<any> {
    return this.http.delete(environment.apiUrl + '/game-tir/' + game.id + '?image=' + game.image +
      '&audioStart=' + game.audio_start +
      '&audioEnd=' + game.audio_end, httpHeaders);
  }

  getListPosition(): Observable<Position[]> {
    return this.http.get(environment.apiUrl + '/game-tir/position', httpHeaders)
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
