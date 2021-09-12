import {ErrorHandlerInterceptor} from '@@core/interceptors/error-handler-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AppSharedModule} from '@@shared/shared.module';

/**
 * All services which have to have one instance per application should be implemented here.
 */

export const HTTP_INTERCEPTOR_PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}
];

@NgModule({
  imports: [
    AppSharedModule
  ],
  providers: [...HTTP_INTERCEPTOR_PROVIDERS],
})
export class AppCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
