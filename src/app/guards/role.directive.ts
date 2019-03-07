import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Role} from '../models/role';


@Directive({
  selector: '[appRoles]'
})
export class RoleDirective {


  @Input() appRoles: Role[];

  constructor(private authService: AuthService, private viewContainerRef: ViewContainerRef,
              private template: TemplateRef<any>) {
  }

  ngOnInit() {
    this.checkRoles();
  }

  checkRoles() {
    const rolesAccess = this.appRoles;
    const rolesUser = this.authService.getListRole();

    let result: boolean;
    result = false;

    for (let i = 0; rolesUser.length > i; i++) {
      if (rolesAccess.find(x => x.code === rolesUser[i].code) !== undefined) {
        result = true;
      }
    }
    if (result) {
      this.viewContainerRef.createEmbeddedView(this.template);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
