import {NgModule} from '@angular/core';
import {InputComponent} from '@@app/widgets/input/components/input.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [InputComponent],
  declarations: [InputComponent]
})
export class InputWidgetModule {}
