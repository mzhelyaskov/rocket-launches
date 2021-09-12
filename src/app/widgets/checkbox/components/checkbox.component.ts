import {Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

// tslint:disable:no-input-rename
@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements ControlValueAccessor {

  private onChange: () => any;
  private onTouched: () => any;
  public disabled: boolean;
  @Input('checked') checked: boolean;

  constructor() {
    this.checked = false;
    this.onChange = () => {};
    this.onTouched = () => {};
  }

  registerOnChange(fn: any): void {
    this.onChange = () => fn(this.checked);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    if (this.isValueChanged(value)) {
      this.checked = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  check() {
    this.checked = !this.checked;
    this.onTouched();
    this.onChange();
  }

  private isValueChanged(value: boolean) {
    return value !== this.checked;
  }
}
