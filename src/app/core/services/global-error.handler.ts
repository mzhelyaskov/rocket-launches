import {HttpCancelService} from '@@core/services/http-cancel.service';
import {HttpErrorHandler} from '@@core/services/http-error.handler';
import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {InternalError} from '@@shared/models/internal-error';
import {HttpError} from '@@shared/models/http-error';
import {UiLockerStoreFacade} from '@@ui-locker/store/ui-locker-store.facade';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  get httpCancelService() {
    return this.injector.get(HttpCancelService);
  }

  get httpErrorService() {
    return this.injector.get(HttpErrorHandler);
  }

  get uiLockerStoreFacade() {
    return this.injector.get(UiLockerStoreFacade);
  }

  handleError(error: Error | HttpError) {
    error = GlobalErrorHandler.unwrapFromPromiseIfNeeded(error);
    if (error instanceof HttpError) {
      this.httpCancelService.cancelPendingRequests();
      this.httpErrorService.handleErrorResponse(error);
    } else {
      const exceptionData = InternalError.of(error);
      console.error(exceptionData);
    }
    this.uiLockerStoreFacade.unlockAll();
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
