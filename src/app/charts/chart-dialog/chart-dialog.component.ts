import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit {
  chartForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chartForm = this.fb.group({
      Mobile: [this.data.Mobile],
      Desktop: [this.data.Desktop],
      Tablet: [this.data.Tablet]
    });
  }

  onSubmit(): void {
    const queryParams = {
      Mobile: this.chartForm.value.Mobile,
      Desktop: this.chartForm.value.Desktop,
      Tablet: this.chartForm.value.Tablet
    };
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
    this.dialogRef.close(this.chartForm.value);
  }
}
