import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {NotifierService} from 'angular-notifier';
import {Role} from '../../../models/role';
import {RoleService} from '../../../services/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  id: number;
  itemUser: User = new User();

  userForm: FormGroup;
  passwordForm: FormGroup;

  listAllRole: Role[] = [];

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
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private breadService: BreadcrumbService,
              private roleService: RoleService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
    this.breadService.doOneBread('Пользователи');
    this.breadService.doTwoBread('Редактировать');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.userService.getUser(this.id)) {
      this.itemUser = this.userService.getUser(this.id);
    } else {
      this.router.navigate(['dashboard/user']);
    }

    this.initUserForm();
    this.initPasswordForm();
    this.getUserRole(this.id);
  }

  ngOnDestroy() {
    this.breadService.unsubscribeBread();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      id: [this.id],
      name: [this.itemUser.name, [Validators.required, Validators.minLength(3), Validators.pattern(/[А-я]/)]],
      email: [this.itemUser.email, [Validators.email]],
      phone: [this.itemUser.phone, [Validators.minLength(11)]],
      roles: [[], [Validators.required]]
    });
  }

  InvalidUser(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  ValidUser(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    const result = control.valid && control.touched;
    return result;
  }

  editUser(user: User) {
    this.userService.putUser(user).subscribe(res => {
      if (res.status === 200) {
        // this.router.navigate(['dashboard', 'user']);
      }
    });
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      id: [this.id],
      password: ['', [Validators.minLength(4), Validators.required]],
      password2: ['', [Validators.minLength(4), Validators.required]]
    });
  }

  InvalidPassword(controlName: string) {
    const control = this.passwordForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  ValidPassword(controlName: string) {
    const control = this.passwordForm.controls[controlName];
    const result = control.valid && control.touched;
    return result;
  }

  editPassword(user) {
    if (user.password === user.password2) {
      this.userService.postUserPassword(user).subscribe(res => {
        if (res.status === 200) {
          this.router.navigate(['dashboard', 'user']);
        }
      });
    } else {
      this.notifier.notify('error', 'Пароли не совпадают!');
    }
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe(res => {
      this.listAllRole = res;
    });
  }

  getUserRole(id: number) {
    this.roleService.getUserRole(id).subscribe(res => {
     this.userForm.get('roles').setValue(res);
      this.getAllRole();
    });
  }

}
