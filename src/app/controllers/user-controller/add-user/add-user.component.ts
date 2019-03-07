import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../models/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;

  listRole: Role[] = [];
  settingsSelect = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Выбрать все',
    unSelectAllText: 'Роли',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    searchPlaceholderText: 'Поиск'
  };

  private notifier: NotifierService;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private roleService: RoleService,
              notifierService: NotifierService,
              private router: Router,
              private breadService: BreadcrumbService) {
    this.notifier = notifierService;
    this.breadService.doOneBread('Пользователи');
    this.breadService.doTwoBread('Добавить');
  }

  ngOnInit() {

    this.getListRole();
    this.initUserForm();
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-z]/)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[А-я]/)]],
      email: ['', Validators.email],
      phone: ['', [Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', [Validators.required, Validators.minLength(4)]],
      roles: [[], [Validators.required]]
    });
  }

  InvalidUser(name: string) {
    const control = this.userForm.controls[name];
    const result = control.invalid && control.touched;
    return result;
  }

  ValidUser(name: string) {
    const control = this.userForm.controls[name];
    const result = control.valid && control.touched;
    return result;
  }

  addUser(user) {
    console.log(user);
    if (user.password === user.password2) {
      this.userService.postUser(user).subscribe(res => {
        if (res.status === 200) {
          this.router.navigate(['dashboard', 'user']);
        }
      });
    } else {
      this.notifier.notify('error', 'Пароли не совпадают!');
    }
  }

  getListRole() {
    this.roleService.getAllRole().subscribe(res => {
      this.listRole = res;
    });
  }
}
