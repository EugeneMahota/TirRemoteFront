import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReportGame} from '../models/report-game';
import {ReportEvent} from '../models/report-event';
import {ReportPerson} from '../models/report-person';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReportDate} from '../models/report-date';
import {environment} from '../../environments/environment';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  listReportGame: ReportGame[] = [];
  listReportEvent: ReportEvent[] = [];
  listReportPerson: ReportPerson[] = [];

  constructor(private http: HttpClient) {
  }

  postGame(data: ReportDate): Observable<ReportGame[]> {
    return this.http.post(environment.apiUrl + '/report/game', JSON.stringify(data), httpHeaders)
      .pipe(map(res => {
        if (res['status'] === 200) {
          this.listReportGame = [].slice.call(res['data']);
          return this.listReportGame = this.listReportGame.map(function (data: any) {
            return {
              name: data.name_game,
              quant: data.quant,
              price: data.price
            };
          });
        } else {
          return [];
        }
      }));
  }

  postEvent(data: ReportDate): Observable<ReportEvent[]> {
    return this.http.post(environment.apiUrl + '/report/event', JSON.stringify(data), httpHeaders)
      .pipe(map(res => {
        if (res['status'] === 200) {
          this.listReportEvent = [].slice.call(res['data']);
          return this.listReportEvent = this.listReportEvent.map(function (data: any) {
            return {
              event: data.event,
              name: data.name,
              quant: data.quant,
              photo: data.photo,
              date: data.date
            };
          });
        } else {
          return [];
        }
      }));
  }

  postPerson(data: ReportDate): Observable<ReportPerson[]> {
    return this.http.post(environment.apiUrl + '/report/person', JSON.stringify(data), httpHeaders)
      .pipe(map((res => {
        if (res['status'] === 200) {
          this.listReportPerson = [].slice.call(res['data']);
          return this.listReportPerson = this.listReportPerson.map(function (data: any) {
            return {
              name: data.name,
              quant_game: data.quant_game,
              quant_souv: data.quant_souv,
              price: data.price
            };
          });
        } else {
          return [];
        }
      })));
  }
}
