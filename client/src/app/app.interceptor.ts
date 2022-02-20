import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { AppService } from './app.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

/**
 * Jwt Token interceptor,
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private appService: AppService, private cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add authorization header to request
    if (this.cookieService.check('access_token')) {
      const token = this.cookieService.get('access_token');
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request);
  }
}

/**
 * Http error interceptor
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';

          if (error.status == 401 || error.status == 403) {
            this.router.navigateByUrl(`/login?returnUrl=${this.route.snapshot.url}`)
          }
          errorMsg = `Error: ${error.error.detail}`;
          // this.notificationService.error('Request failed!', `<p>An error occured. Please try again later</p>`)
          // console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
