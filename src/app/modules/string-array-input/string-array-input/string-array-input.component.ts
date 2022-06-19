import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseCustomInputComponent } from '../../base-custom-input/base-custom-input.module';

@Component({
  selector: 'app-string-array-input',
  templateUrl: './string-array-input.component.html',
  styleUrls: ['./string-array-input.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: StringArrayInputComponent,
    }
  ]
})
export class StringArrayInputComponent extends BaseCustomInputComponent<string[]> {
  
  @Input() limit: number = -1;

  stringElementArray: { string: string }[] = [];

  get shouldLabelFloat(): boolean {
    return true;
  }

  get value(): string[] | null {
    return this.stringElementArray.map(x => x.string);
  } 

  set value(value: string[] | null) {
    if (value) {
      this.stringElementArray = value.map(x => ({ string: x })); 
    }
  }
  
  constructor(
    protected changeDetector: ChangeDetectorRef,

    focusMonitor: FocusMonitor,
    elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() ngControl: NgControl,
  ) {
    super(
      focusMonitor, 
      elementRef, 
      ngControl
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!this.stringElementArray || event.previousIndex === event.currentIndex)
      return;
    
    moveItemInArray(this.stringElementArray, event.previousIndex, event.currentIndex);
    
    this.edited();
  }

  edited() {
    this.onChange(this.value);
    this.markAsTouched();
  }

  addString() {
    this.stringElementArray.unshift({
      string: ""
    });
    this.edited();
  }

  deleteString(index: number) {
    this.stringElementArray.splice(index, 1);
    this.edited();
    this.changeDetector.detectChanges();
  }
}
