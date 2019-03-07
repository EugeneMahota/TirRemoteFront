import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,
              private authService: AuthService,
              private router: Router,
              private loadingService: LoadingService) {
    this.notifier = notifierService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();

    const token = localStorage.getItem('token') || this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request).pipe(tap((res: HttpEvent<any>) => {
      if (res instanceof HttpResponse) {
        const body = res.body;
        if (body.status === 200) {
          if (body.msg) {
            this.notifier.notify('success', body.msg);
          }
        } else if (body.status === 400) {
          if (body.msg) {
            this.notifier.notify('error', body.msg);
          }
        } else if (body.status === 401) {
          if (body.msg) {
            this.notifier.notify('error', body.msg);
          }
          this.router.navigate(['']);
        } else if (body.status === 500) {
          if (body.msg) {
            this.notifier.notify('error', body.msg);
          }
        }
        this.hideLoading();
      }
    }, err => {
      if (err.status === 500) {
        this.notifier.notify('error', 'Ошибка сервера!');
      } else if (err.status === 401) {
        this.notifier.notify('error', 'Ошибка авторизации!');
        this.router.navigate(['']);
      } else if (err.status === 404) {
        this.notifier.notify('error', 'Страница не найдена!');
      } else if (err.status === 0) {
        this.notifier.notify('error', 'Сервер не отвечает!');
        this.router.navigate(['']);
      } else {
        this.notifier.notify('error', 'Неизвестная ошибка!');
        this.router.navigate(['']);
      }
      this.hideLoading();
    }));
  }

  hideLoading() {
    this.loadingService.hideLoading();
  }

  showLoading() {
    this.loadingService.showLoading();
  }
}
