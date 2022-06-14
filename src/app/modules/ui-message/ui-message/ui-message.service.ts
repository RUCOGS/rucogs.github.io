import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UIMessageService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }
  
  notifyConfirmed(message: string) {
    this.snackBar.open("✅ " + message, undefined, { duration: 100 * message.length });
  }

  error(error: Error | string) {
    let message = "";
    if (error instanceof Error)
      message = error.message;
    else
      message = error;
    
    this.snackBar.open("🛑 " + message, undefined, { duration: 100 * message.length });
  }

  confirmDialog(message: string) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message
      }
    });
    return dialog.afterClosed()
      .pipe(
        first(),
        map((value) => {
          if (value === undefined)
            return false;
          return true;
        })
      );
  }
}
