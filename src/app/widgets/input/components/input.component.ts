import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {InputPrefixIconDirective} from '@@widgets/input/directives/input-prefix-icons.directives';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss']
})
export class InputComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('input') inputElementRef: ElementRef<HTMLInputElement>;
  @ContentChild('appPrefixIcon') inputPrefixIcon: InputPrefixIconDirective;

  private _onChange: (value: string) => void;
  private _onTouch: () => void;
  private _value: string;

  @Input() name: string;
  @Input() label: string;

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this;
    this._onChange = () => {};
    this._onTouch = () => {};
  }

  set value(value: string) {
    this._value = value;
    if (this.inputElement) {
      this.inputElement.value = value;
    }
  }

  get prefixIcon(): boolean {
    return Boolean(this.inputPrefixIcon);
  }

  get inputElement(): HTMLInputElement {
    return this.inputElementRef?.nativeElement;
  }

  ngOnInit(): void {
    this.name = this.name || String(this.ngControl.name);
  }

  onInput(value: string) {
    this._onChange(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  ngAfterViewInit(): void {
    this.inputElement.value = this._value;
  }

  writeValue(value: string): void {
    this.value = value;
  }
}
