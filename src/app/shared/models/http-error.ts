import {HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {ErrorUtils} from '@@core/utils/error.utils';

interface Params {
  uuid: string;
  request: HttpRequest<any>;
  response: HttpErrorResponse;
}

export class HttpError {

  uuid: string;
  request: HttpRequest<any>;
  response: HttpErrorResponse;

  private constructor({uuid, request, response}: Params) {
    this.uuid = uuid;
    this.request = request;
    this.response = response;
  }

  static of(request: HttpRequest<any>, errorResponse: HttpErrorResponse): HttpError {
    return new HttpError({
      uuid: ErrorUtils.getHttpErrorId(errorResponse),
      response: errorResponse,
      request
    });
  }
}
