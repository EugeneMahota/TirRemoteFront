import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gun} from '../models/gun';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Accept': 'multipart/form-data; boundary'})};

@Injectable({
  providedIn: 'root'
})
export class GunService {

  listGun: Gun[] = [];

  constructor(private http: HttpClient) {
  }

  getListGun(): Observable<Gun[]> {
    return this.http.get(environment.apiUrl + '/gun')
      .pipe(map(res => {
        this.listGun = [].slice.call(res['data']);
        return this.listGun = this.listGun.map(function (data: any) {
          return {
            id: data.gun_id,
            name: data.name,
            voltage: data.voltage,
            image: data.image,
            audio: data.audio
          };
        });
      }));
  }

  getGun(id: number): Gun {
    return this.listGun.find(x => x.id === id);
  }

  postGun(audio, image, name: string, voltage: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('audio', audio);

    return this.http.post(environment.apiUrl + '/gun?name=' + name + '&voltage=' + voltage, formData, httpHeaders);
  }

  putGun(audio: File, image: File, gun: Gun): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('audio', audio);

    return this.http.put(environment.apiUrl + '/gun/'
      + gun.id + '?name=' + gun.name + '&voltage=' + gun.voltage + '&image=' + gun.image + '&audio=' + gun.audio, formData, httpHeaders);
  }

  delGun(id: number, image: string, audio: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/gun/' + id + '?image=' + image + '&audio=' + audio);
  }
}
