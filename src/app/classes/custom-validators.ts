import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isRutgersEmail } from '@src/shared/validation';

export class CustomValidators {
  static defined(control: AbstractControl): ValidationErrors | null {
    const isDefined = control.value !== undefined && control.value !== null;
    return isDefined ? null : { notDefined: true };
  }

  static rutgersEmail(control: AbstractControl): ValidationErrors | null {
    const valid = isRutgersEmail(control.value);
    return valid ? null : { rutgersEmail: true };
  }
}
