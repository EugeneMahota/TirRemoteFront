import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {BreadcrumbService} from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {

  itemUser: User = new User();
  listUser: User[] = [];

  constructor(private userService: UserService, private breadService: BreadcrumbService) {
    this.breadService.doOneBread('Пользователи');
  }

  ngOnInit() {
    this.userService.getListUser().subscribe(res => {
      this.listUser = res;
    });
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  deleteUser() {
    this.userService.delUser(this.itemUser.id).subscribe(res => {
      if (res.status === 200) {
        this.ngOnInit();
      }
    });
  }

}
