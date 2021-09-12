import {HttpCancelService} from '@@core/services/http-cancel.service';
import {HttpErrorHandler} from '@@core/services/http-error.handler';
import {CoreStateFacade} from '@@core/store/core-state.facade';
import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {InternalError} from '@@shared/models/internal-error';
import {HttpError} from '@@shared/models/http-error';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  get httpCancelService() {
    return this.injector.get(HttpCancelService);
  }

  get httpErrorService() {
    return this.injector.get(HttpErrorHandler);
  }

  get errorsStoreFacade() {
    return this.injector.get(CoreStateFacade);
  }

  handleError(error: Error | HttpError) {
    error = GlobalErrorHandler.unwrapFromPromiseIfNeeded(error);
    if (error instanceof HttpError) {
      this.httpCancelService.cancelPendingRequests();
    } else {
      const exceptionData = InternalError.of(error);
      this.errorsStoreFacade.setException(exceptionData);
    }
  }

  private static unwrapFromPromiseIfNeeded(error: any) {
    // https://github.com/angular/angular/issues/27840
    if (error.promise) {
      while (error.rejection) {
        error = error.rejection;
      }
    }
    return error;
  }
}
