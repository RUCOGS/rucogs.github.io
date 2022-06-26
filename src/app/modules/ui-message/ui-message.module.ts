import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIMessageService } from './ui-message/ui-message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@app/modules/_core/core.module';

export { UIMessageService };

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatSnackBarModule, MatDialogModule, MatButtonModule, CoreModule],
  providers: [UIMessageService],
})
export class UIMessageModule {}
