import {HttpError} from '@@shared/models/http-error';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as HttpStatus from 'http-status-codes';

@Injectable({providedIn: 'root'})
export class HttpErrorHandler {

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
