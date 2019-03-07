import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {Loading} from '../../models/loading';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  loadingState: boolean = false;

  subscription: Subscription;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.loadingState.subscribe((state: Loading) => {
      this.loadingState = state.state;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
