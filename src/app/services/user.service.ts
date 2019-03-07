import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUser: User[] = [];

  constructor(private http: HttpClient) {
  }

  getListUser(): Observable<User[]> {
    return this.http.get(environment.apiUrl + '/user', httpHeaders)
      .pipe(map(res => {
        this.listUser = [].slice.call(res['data']);
        return this.listUser = this.listUser.map(function (data: any) {
          return {
            id: data.user_id,
            name: data.name,
            login: data.login,
            email: data.email,
            phone: data.phone
          };
        });
      }), catchError(err => {
        return [];
      }));
  }

  getUser(id: number): User {
    return this.listUser.find(x => x.id === id);
  }

  delUser(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/user/' + id, httpHeaders);
  }

  putUser(user: User): Observable<any> {
    return this.http.put(environment.apiUrl + '/user/' + user.id, JSON.stringify(user), httpHeaders);
  }

  postUser(user: User): Observable<any> {
    return this.http.post(environment.apiUrl + '/user', JSON.stringify(user), httpHeaders);
  }

  postUserPassword(user): Observable<any> {
    return this.http.post(environment.apiUrl + '/user/password', JSON.stringify(user), httpHeaders);
  }
}
