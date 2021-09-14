import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
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
  }]
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('checkbox') inputElementRef: ElementRef<HTMLInputElement>;
  private onChange: (checked: boolean) => any;
  private onTouched: () => any;
  public checked: boolean;

  @Input('checked') set onCheckedChange(checked: boolean) {
    this.checked = checked;
    if (this.checkboxElement) {
      this.checkboxElement.checked = checked;
    }
  }

  get checkboxElement(): HTMLInputElement {
    return this.inputElementRef?.nativeElement;
  }

  constructor() {
    this.checked = false;
    this.onChange = (checked: boolean) => {};
    this.onTouched = () => {};
  }

  ngAfterViewInit(): void {
    this.checkboxElement.checked = this.checked;
  }

  registerOnChange(fn: any): void {
    this.onChange = (checked: boolean) => {
      this.checked = Boolean(checked);
      this.checkboxElement.checked = checked;
      fn(checked);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(checked: boolean): void {
    this.checked = Boolean(checked);
    if (this.checkboxElement) {
      this.checkboxElement.checked = checked;
    }
  }

  check() {
    this.onChange(!this.checked);
    this.onTouched();
  }
}
