import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fl_save: boolean;
  login: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
    this.fl_save = true;
  }

  ngOnInit() {
  }

  longIn(data) {
    this.authService.login(data).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['dashboard']);
      }
    });
  }

}
