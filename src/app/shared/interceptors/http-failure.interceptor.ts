import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class HttpFailureInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err) => {
          if (err.error.error) {
            this.snackbarService.show(err.error.error, false, 3000);
          }
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log(err.message);
              this.authService.logout();
            }
            if (err.status === 403) {
              console.log(err.message);
              this.authService.logout();
            }
          }
        }
      )
    );
  }
}
