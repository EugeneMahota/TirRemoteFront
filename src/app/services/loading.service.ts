import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Loading} from '../models/loading';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new Subject<Loading>();
  loadingState = this.loadingSubject.asObservable();

  constructor() {
  }

  hideLoading() {
    this.loadingSubject.next(<Loading>{state: false});
  }

  showLoading() {
    this.loadingSubject.next(<Loading>{state: true});
  }
}
