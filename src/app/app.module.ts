import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LaunchInfoComponents} from './components/launch-info/launch-info.component';
import {AppCoreModule} from '@@core/core.module';
import {AppSharedModule} from '@@shared/shared.module';
import {MultiSelectDropdownWidgetModule} from '@@widgets/multiselect-dropdown/multi-select-dropdown-widget.module';
import {InputWidgetModule} from '@@widgets/input/input-widget.module';
import {MULTI_SELECT_DROPDOWN_DATA_SERVICE} from '@@widgets/multiselect-dropdown/config/multi-select-dropdown.config';
import {LaunchesDropdownDataService} from '@@app/services/launches-dropdown-data.service';
import {HttpClientModule} from '@angular/common/http';
import {LaunchInfoListComponents} from '@@app/components/launch-info-list/launch-info-list.component';
import {NgxsModule, NoopNgxsExecutionStrategy} from '@ngxs/store';
import {environment} from '../environments/environment';
import {LaunchesState} from '@@app/store/launches.state';
import {DependencyInjectorService} from '@@core/services/dependency-injector.service';
import {GlobalErrorHandler} from '@@core/services/global-error.handler';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {PaginationWidgetModule} from '@@widgets/pagination/pagination-widget.module';
import {ToastrModule} from 'ngx-toastr';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    AppCoreModule,
    AppSharedModule,
    InputWidgetModule,
    HttpClientModule,
    PaginationWidgetModule,
    NoopAnimationsModule,
    MultiSelectDropdownWidgetModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    NgxsModule.forRoot([LaunchesState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      },
      executionStrategy: NoopNgxsExecutionStrategy
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'rocket-launches',
      maxAge: 50,
      disabled: environment.production
    })
  ],
  declarations: [
    AppComponent,
    LaunchInfoListComponents,
    LaunchInfoComponents
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: MULTI_SELECT_DROPDOWN_DATA_SERVICE, useClass: LaunchesDropdownDataService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private decoratorService: DependencyInjectorService) {}
}
