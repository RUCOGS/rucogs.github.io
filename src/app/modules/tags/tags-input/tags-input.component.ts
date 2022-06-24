import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseCustomInputComponent } from '@app/modules/base-custom-input/base-custom-input.module';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: TagsInputComponent,
    }
  ]
})
export class TagsInputComponent extends BaseCustomInputComponent<string[]> {
  @Input() limit: number = -1;

  readonly addOnBlur = true as const;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!this.value)
      this.value = [];
    
    // Add our fruit
    if (value && !this.value.includes(value) && (this.limit < 0 || this.value.length < this.limit)) {
      this.value.push(value);
      this.onChange(this.value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    if (!this.value)
      return;
    
    const index = this.value.indexOf(tag);

    if (index >= 0) {
      this.value.splice(index, 1);
      this.onChange(this.value);
    }
  }
  
//#region // ----- BaseCustomInputComponent ----- //
  static nextId = 0;
  get empty() {
    return !this.value || this.value.length === 0;
  }

  public controlType: string = `app-user-input`;
  public id: string = `${this.controlType}-${TagsInputComponent.nextId++}`;
//#engregion // -- BaseCustomInputComponent ----- //
}
