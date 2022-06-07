import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIMessageService } from './ui-message/ui-message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export { UIMessageService };


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    UIMessageService
  ]
})
export class UIMessageModule { }
