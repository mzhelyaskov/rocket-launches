import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MultiSelectDropdownComponent} from '@@widgets/multiselect-dropdown/components/dropdown/multi-select-dropdown.component';
import {InputWidgetModule} from '@@widgets/input/input-widget.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppCheckboxWidgetModule} from '@@widgets/checkbox/checkbox-widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InputWidgetModule,
    AppCheckboxWidgetModule
  ],
  exports: [MultiSelectDropdownComponent],
  declarations: [
    MultiSelectDropdownComponent,
  ],
  providers: [
    {provide: Window, useValue: window}
  ]
})
export class MultiSelectDropdownWidgetModule {}
