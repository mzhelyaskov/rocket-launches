import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LaunchInfoComponents} from './components/launch-info/launch-info.component';
import {AppCoreModule} from '@@core/core.module';
import {AppSharedModule} from '@@shared/shared.module';
import {MultiSelectDropdownWidgetModule} from '@@widgets/multiselect-dropdown/multi-select-dropdown-widget.module';
import {InputWidgetModule} from '@@widgets/input/input-widget.module';
import {MULTI_SELECT_DROPDOWN_DATA_SERVICE} from '@@widgets/multiselect-dropdown/config/multi-select-dropdown.config';
import {LaunchesDropdownDataService} from '@@app/rest/launches-dropdown-data.service';
import {HttpClientModule} from '@angular/common/http';
import {LaunchInfoListComponents} from '@@app/components/launch-info-list/launch-info-list.component';
import {NgxsModule, NoopNgxsExecutionStrategy} from '@ngxs/store';
import {environment} from '../environments/environment';
import {LaunchesState} from '@@app/store/launches.state';

@NgModule({
  imports: [
    BrowserModule,
    AppCoreModule,
    AppSharedModule,
    InputWidgetModule,
    HttpClientModule,
    MultiSelectDropdownWidgetModule,
    NgxsModule.forRoot([LaunchesState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      },
      executionStrategy: NoopNgxsExecutionStrategy
    }),
  ],
  declarations: [
    AppComponent,
    LaunchInfoListComponents,
    LaunchInfoComponents
  ],
  providers: [
    {provide: MULTI_SELECT_DROPDOWN_DATA_SERVICE, useClass: LaunchesDropdownDataService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
