import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor, OnInit {

  private onChange: (value: string) => void;
  private onTouch: () => void;

  public value: string;

  @Input() name: string;
  @Input() label: string;
  @Input() icon: string;

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this;
    this.onChange = () => {};
    this.onTouch = () => {};
    this.value = null;
  }

  ngOnInit(): void {
    this.name = this.name || String(this.ngControl.name);
  }

  onInput(value: string) {
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    if (value === null || typeof value === 'string') {
      this.value = value;
    } else {
      throw new Error(`[InputComponent] Unsupported value type: ${typeof value}`);
    }
  }
}
