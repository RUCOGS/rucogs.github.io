import { UntypedFormGroup } from '@angular/forms';

export class FormConfigurer {
  constructor(public formControl: UntypedFormGroup) {}

  initControl(name: string, initialValue: any, enable: boolean = true) {
    const control = this.formControl.get(name);
    if (!control) return;
    if (enable) control.enable();
    else control.disable();
    control.setValue(initialValue);
  }
}
