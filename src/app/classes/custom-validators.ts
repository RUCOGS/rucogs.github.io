import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static defined(control: AbstractControl): ValidationErrors | null {
    const isDefined = control.value !== undefined && control.value !== null;
    return isDefined ? {
      isDefined: false
    } : null;
  }
}