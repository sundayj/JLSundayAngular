import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SnackbarContentComponent} from "../../components/snackbar-content/snackbar-content.component";

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showError(description: string): void {
    this.snackBar.openFromComponent(SnackbarContentComponent, {
      data: { message: description, isError: true },
    });
  }

  showInfo(description: string): void {
    this.snackBar.openFromComponent(SnackbarContentComponent, {
      data: { message: description, isError: false },
      duration: 3000,
    });
  }

  dismissSnackBar(): void {
    this.snackBar.dismiss();
  }
}
