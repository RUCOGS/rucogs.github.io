import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login/login-page.component';
import { IconModule } from '@visurel/iconify-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { MatInputModule } from '@angular/material/input';

export { LoginPageComponent };


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    IconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule { }
