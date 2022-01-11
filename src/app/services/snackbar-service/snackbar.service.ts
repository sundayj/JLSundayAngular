import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  private snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  showError(description: string): void {
    this.snackBarRef = this.snackBar.open(
      description, 'X', {
        panelClass: 'sb-error'
      });
  }

  showInfo(description: string): void {
    this.snackBar.open(
      description, 'X', {
        duration: 3000
      });
  }

  dismissSnackBar(): void {
    this.snackBar.dismiss();
  }
}
