import {HttpError} from '@@shared/models/http-error';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class HttpErrorHandler {

  constructor(private toastrService: ToastrService,
              private ngZone: NgZone) {
  }

  handleErrorResponse(httpErrorData: HttpError) {
    const response: HttpErrorResponse = httpErrorData.response;
    const status = response.status;
    switch (status) {
      case HttpStatus.BAD_REQUEST: {
        console.log('Handle BAD_REQUEST');
        break;
      }
      case HttpStatus.UNAUTHORIZED: {
        console.log('Navigate to login page');
        break;
      }
      case HttpStatus.FORBIDDEN: {
        console.log('Logout and navigation to login page');
        break;
      }
      case HttpStatus.NOT_FOUND: {
        console.log('Show page 404');
        break;
      }
      case HttpStatus.TOO_MANY_REQUESTS: {
        this.ngZone.run(() => {
          this.toastrService.error(
            response.error?.detail || '',
            '[429] TOO MANY REQUESTS'
          );
        });
        break;
      }
      default: {
        if (status >= 500) {
          console.log('Show info for user');
        }
        this.logAJAXCallError(httpErrorData);
      }
    }
  }

  private logAJAXCallError(httpErrorData: HttpError) {
    const response = httpErrorData.response;
    console.error(`AJAX call error: ${response.message}\n`, httpErrorData);
  }
}
