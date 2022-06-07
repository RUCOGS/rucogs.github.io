import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIMessageService {

  constructor(private snackBar: MatSnackBar) { }

  error(error: Error | string) {
    if (error instanceof Error)
      this.snackBar.open("🛑" + error.message);
    else
      this.snackBar.open("🛑" + error);
  }
}
