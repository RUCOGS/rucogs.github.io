import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { IconModule } from '@visurel/iconify-angular';
import { LoginPageComponent } from './login/login-page.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: LoginPageComponent,
    data: {
      title: 'Login',
    },
  },
];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    IconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageModule {}
