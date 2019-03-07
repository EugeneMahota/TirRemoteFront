import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Camera} from '../models/camera';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  listCamera: Camera[] = [];
  constructor(private http: HttpClient) {
  }

  getListCamera(): Observable<Camera[]> {
    return this.http.get(environment.apiUrl + '/camera', httpHeaders)
      .pipe(map(res => {
        this.listCamera = [].slice.call(res['data']);
        return this.listCamera = this.listCamera.map(function (data: any) {
          return {
            id: data.camera_id,
            name: data.name,
            address: data.address
          };
        });
      }));
  }

  getCamera(id): Camera {
    return this.listCamera.find(x => x.id === id);
  }

  postCamera(camera: Camera): Observable<any> {
    return this.http.post(environment.apiUrl + '/camera', JSON.stringify(camera), httpHeaders);
  }

  putCamera(camera: Camera): Observable<any> {
    return this.http.put(environment.apiUrl + '/camera/' + camera.id, JSON.stringify(camera), httpHeaders);
  }

  delCamera(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/camera/' + id, httpHeaders);
  }
}
