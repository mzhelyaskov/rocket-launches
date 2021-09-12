import {HttpError} from '@@shared/models/http-error';

export class HttpErrorDataUtils {

  static getResponsePayload(error: HttpError) {
    return error?.response?.error;
  }
}
