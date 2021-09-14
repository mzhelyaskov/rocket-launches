import {StorageService} from '@@core/services/storage.service';
import {DependencyInjectorService} from '@@core/services/dependency-injector.service';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';

export function Cache(namespace: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function () {
      const storageKey = `${namespace}_${JSON.stringify(arguments)}`;
      const storageService: StorageService = DependencyInjectorService.injectOutsideAngular(StorageService);
      const content = storageService.get(storageKey);
      if (content) {
        return of(JSON.parse(content));
      } else {
        const result$ = originalFunction.apply(this, arguments);
        return result$.pipe(tap(content => storageService.set(storageKey, JSON.stringify(content))));
      }
    };
    return descriptor;
  };
}
