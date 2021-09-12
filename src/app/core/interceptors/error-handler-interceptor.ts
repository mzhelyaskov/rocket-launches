import {HttpCancelService} from '@@core/services/http-cancel.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {HttpError} from '@@shared/models/http-error';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private httpCancelService: HttpCancelService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: Error | HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          return throwError(HttpError.of(req, error));
        }
        return throwError(error);
      }),
      takeUntil(this.httpCancelService.cancelPendingRequests$),
    );
  }
}
