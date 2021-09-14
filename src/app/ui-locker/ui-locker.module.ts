import {FullScreenLockerComponent} from '@@ui-locker/components/full-screen-locker/full-screen-locker.component';
import {UiLockerState} from '@@ui-locker/store/ui-locker.state';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';

const SHARED_DECLARATIONS = [
  FullScreenLockerComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([UiLockerState])
  ],
  declarations: SHARED_DECLARATIONS,
  exports: SHARED_DECLARATIONS
})
export class AppUiLockerModule {}
