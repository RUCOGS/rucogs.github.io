import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { WithDestroy } from '@src/app/classes/mixins';
import { Subject } from 'rxjs';
import mixin from 'ts-mixin-extended';

@Directive()
export class BaseCustomInputComponent<TValue> extends mixin(class {
  constructor(
    protected focusMonitor: FocusMonitor,
    protected elementRef: ElementRef,
    public ngControl: NgControl,
  ) {}
}, WithDestroy) implements ControlValueAccessor, MatFormFieldControl<TValue>, OnDestroy {

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  protected _value: TValue | null = null;
  get value(): TValue | null {
    return this._value;
  }
  set value(value: TValue | null) {
    const oldValue = this._value;
    this._value = value;
    if (!this.areValuesEqual(value, oldValue)) {
      this.onChange(value);
      this.markAsTouched();
    }
  }

  protected areValuesEqual(value: TValue | null, otherValue: TValue | null) {
    return value === otherValue;
  }

  @Input('attr.aria-describedby') userAriaDescribedBy?: string | undefined;

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  protected _placeholder: string = "";

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  protected _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._onDisabled(this._disabled);
    this.stateChanges.next();
  }
  protected _disabled = false;
  protected _onDisabled(disable: boolean) {};

  focused: boolean = false;

  get empty(): boolean { return !this.value; };

  get shouldLabelFloat() { 
    return this.focused || !this.empty; 
  }

  touched: boolean = false;
  stateChanges = new Subject<void>();
  errorState: boolean = false;
  get autofilled(): boolean {
    return false;
  };

  protected onDestroy$ = new Subject<void>();
  
  public controlType: string = "";
  public id: string = "";

  constructor(
    focusMonitor: FocusMonitor,
    elementRef: ElementRef,
    ngControl: NgControl,
  ) {
    super(focusMonitor, elementRef, ngControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elementRef.nativeElement;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(value: TValue | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    this.onTouched();
  }
}