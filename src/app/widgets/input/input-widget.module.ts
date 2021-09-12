import {NgModule} from '@angular/core';
import {InputComponent} from '@@app/widgets/input/components/input.component';
import {CommonModule} from '@angular/common';
import {InputPrefixIconDirective} from '@@widgets/input/directives/input-prefix-icons.directives';

@NgModule({
  imports: [CommonModule],
  exports: [InputComponent, InputPrefixIconDirective],
  declarations: [InputComponent, InputPrefixIconDirective]
})
export class InputWidgetModule {}
