import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Role} from '../models/role';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  listAllRole: Role[] = [];
  listUserRole: Role[] = [];

  constructor(private http: HttpClient) {
  }

  getAllRole(): Observable<Role[]> {
    return this.http.get(environment.apiUrl + '/role', httpHeaders)
      .pipe(map(res => {
        if (res['status'] === 200) {
          this.listAllRole = [].slice.call(res['data']);
          return this.listAllRole = this.listAllRole.map(function (data: any) {
            return {
              id: data.role_id,
              name: data.name,
              code: data.code
            };
          });
        } else {
          return [];
        }
      }));
  }

  getUserRole(id: number): Observable<Role[]> {
    return this.http.get(environment.apiUrl + '/role/user/' + id, httpHeaders)
      .pipe(map(res => {
        if (res['status'] === 200) {
          this.listUserRole = [].slice.call(res['data']);
          return this.listUserRole = this.listUserRole.map(function (data: any) {
            return {
              id: data.role_id,
              name: data.name,
              code: data.code
            };
          });
        } else {
          return [];
        }
      }));
  }
}
