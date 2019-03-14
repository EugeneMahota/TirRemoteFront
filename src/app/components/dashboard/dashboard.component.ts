import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Location} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('dropdown', [
    state('void', style({
      marginLeft: '-228px',
      opacity: 0
    })),
    state('*', style({
      marginTop: 0,
      opacity: 1
    })),
    transition('void=>*, *=>void', animate('200ms ease-in-out'))
  ]),
    trigger('arrow', [
      state('right', style({
        transform: 'rotate(0deg)'
      })),
      state('bottom', style({
        transform: 'rotate(90deg)'
      })),
      transition('right<=>bottom', animate('200ms ease-in-out'))
    ])
  ]
})
export class DashboardComponent implements OnInit {

  show: boolean;

  breadOne: string;
  breadTwo: string;
  breadThree: string;

  nameUser: string;

  dropDownGame = false;
  dropDownReport = false;

  constructor(private authService: AuthService,
              private router: Router,
              private breadService: BreadcrumbService,
              private location: Location) {
    this.breadService.onOneBread.subscribe(bread => {
      this.breadOne = bread;
    });
    this.breadService.onTwoBread.subscribe(bread => {
      this.breadTwo = bread;
    });
    this.breadService.onThreeBread.subscribe(bread => {
      this.breadThree = bread;
    });
  }

  ngOnInit() {
    this.nameUser = this.authService.getNameUser();
    this.show = JSON.parse(localStorage.getItem('show')) || false;
  }

  onExit() {
    this.authService.onExit();
  }

  Side() {
    this.show = !this.show;
    localStorage.setItem('show', JSON.stringify(this.show));
  }

  ShowDisplaySm() {
    if (screen.width < 1131) {
      this.show = !this.show;
      localStorage.setItem('show', JSON.stringify(this.show));
    }
  }

  onBack() {
    this.location.back();
  }

}
