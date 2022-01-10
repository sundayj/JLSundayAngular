import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snackbar-content',
  templateUrl: './snackbar-content.component.html',
  styleUrls: ['./snackbar-content.component.css']
})
export class SnackbarContentComponent implements OnInit {
  constructor(
    public sbRef: MatSnackBarRef<SnackbarContentComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  getBackgroundClass(): string {
    if (this.data.isError) {
      return 'sb-background sb-error';
    }
    return 'sb-background sb-info';
  }

  closeMe(): void {
    this.sbRef.dismiss();
  }

}
