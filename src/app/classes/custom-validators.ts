import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static defined(control: AbstractControl): ValidationErrors | null {
    const isDefined = control.value !== undefined && control.value !== null;
    return isDefined ? null : { notDefined: true };
  }
}
