import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {


  oneBread: string;
  onOneBread: EventEmitter<string> = new EventEmitter();

  twoBread: string;
  onTwoBread: EventEmitter<string> = new EventEmitter();

  threeBread: string;
  onThreeBread: EventEmitter<string> = new EventEmitter();
  constructor() {
  }

  doOneBread(Bread: string) {
    this.oneBread = Bread;
    this.onOneBread.emit(this.oneBread);
  }

  doTwoBread(Bread: string) {
    this.twoBread = Bread;
    this.onTwoBread.emit(this.twoBread);
  }

  doThreeBread(Bread: string) {
    this.threeBread = Bread;
    this.onThreeBread.emit(this.threeBread);
  }

  unsubscribeBread() {
    this.twoBread = null;
    this.onTwoBread.emit(this.twoBread);
    this.oneBread = null;
    this.onOneBread.emit(this.oneBread);
    this.threeBread = null;
    this.onThreeBread.emit(this.threeBread);
  }
}
