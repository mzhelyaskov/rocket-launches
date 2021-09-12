import {Injectable, Injector, Type} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DependencyInjectorService {

  private static injector: Injector;

  constructor(injector: Injector) {
    DependencyInjectorService.injector = injector;
  }

  public static injectOutsideAngular<T>(dependency: Type<T>): T {
    return DependencyInjectorService.injector.get<T>(dependency);
  }
}
