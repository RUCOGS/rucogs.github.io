import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup/signup-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export { SignupPageComponent };


@NgModule({
  declarations: [
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    IconModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    SignupPageComponent
  ]
})
export class SignupPageModule { }
