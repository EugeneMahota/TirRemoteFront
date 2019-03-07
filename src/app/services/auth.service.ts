import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Role} from '../models/role';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  longIn: boolean;
  token: string;
  nameUser: string;

  listRole: Role[] = [];
  constructor(private http: HttpClient, private router: Router) {
  }

  login(data): Observable<any> {
    return this.http.post(environment.apiUrl + '/login', JSON.stringify(data), httpHeaders)
      .pipe(map(res => {
        if (res['status'] === 200) {
          this.nameUser = res['name'];
          this.listRole = res['roles'];
          if (data.fl_save) {
            this.setLongIn();
            localStorage.setItem('token', res['token']);
          } else {
            this.setLongIn();
            this.token = res['token'];
          }
        }
        return res;
      }));
  }

  refresh() {
    const token = localStorage.getItem('token');
    return this.http.post(environment.apiUrl + '/refresh', JSON.stringify({token: token}), httpHeaders)
      .pipe(map(res => {
        this.nameUser = res['name'];
        this.listRole = res['roles'];
        if (res['status'] === 200) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }));
  }

  setLongIn() {
    this.longIn = true;
  }

  getLongIn(): boolean {
    return this.longIn;
  }

  getToken(): string {
    return this.token;
  }

  getNameUser(): string {
    return this.nameUser;
  }

  getListRole() {
    return this.listRole;
  }

  onExit() {
    localStorage.clear();
    this.token = null;
    this.router.navigate(['']);
  }

}
