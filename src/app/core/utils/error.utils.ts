import {HttpErrorResponse} from '@angular/common/http';

export class ErrorUtils {

  static getHttpErrorId(errorResponse: HttpErrorResponse) {
    return errorResponse?.error?.errorCode;
  }
}
