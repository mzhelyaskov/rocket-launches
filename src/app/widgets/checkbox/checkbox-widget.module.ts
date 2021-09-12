import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CheckboxComponent} from '@@widgets/checkbox/components/checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CheckboxComponent],
  declarations: [CheckboxComponent]
})
export class AppCheckboxWidgetModule {}
