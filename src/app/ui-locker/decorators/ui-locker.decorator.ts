import {DependencyInjectorService} from '@@core/services/dependency-injector.service';
import {UiLockerStoreFacade} from '@@ui-locker/store/ui-locker-store.facade';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

/**
 * Applicable only for method that return Observable or Promise
 */
export function UiLocking(): MethodDecorator {
  return ((target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const uiLockerStoreFacade = DependencyInjectorService.injectOutsideAngular(UiLockerStoreFacade);
      uiLockerStoreFacade.incrementPendingRequests();
      const result = originalFunction.apply(this, args);
      if (result instanceof Observable) {
        return result.pipe(finalize(() => {
          uiLockerStoreFacade.decrementPendingRequests();
        }));
      } else if (result instanceof Promise) {
        const promiseResponseDecorator = (response: any) => {
          uiLockerStoreFacade.decrementPendingRequests();
          return response;
        };
        return result
          .then(promiseResponseDecorator)
          .catch(promiseResponseDecorator);
      }
      return result;
    };
    return descriptor;
  }) as MethodDecorator;
}
