import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { ServicesModule } from '@src/app/services/_services.module';

export { NewProjectPageComponent };



@NgModule({
  declarations: [
    NewProjectPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatRadioModule,
    MatIconModule,
    ServicesModule
  ],
  exports: [
    NewProjectPageComponent
  ]
})
export class NewProjectModule { }
