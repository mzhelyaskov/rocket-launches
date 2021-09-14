import {FullScreenLockerComponent} from '@@ui-locker/components/full-screen-locker/full-screen-locker.component';
import {SectionLockerComponent} from '@@ui-locker/components/section-locker/section-locker.component';
import {UiLockerState} from '@@ui-locker/store/ui-locker.state';
import {CommonModule} from '@angular/common';
import {Injector, NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';

const SHARED_DECLARATIONS = [
  FullScreenLockerComponent,
  SectionLockerComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([UiLockerState])
  ],
  declarations: SHARED_DECLARATIONS,
  exports: SHARED_DECLARATIONS
})
export class AppUiLockerModule {

  static coreInjector: Injector;

  constructor(private injector: Injector) {
    AppUiLockerModule.coreInjector = injector;
  }
}
