import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-pie',
  templateUrl: './form-pie.component.html',
  styleUrls: ['./form-pie.component.scss']
})
export class FormPieComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      label1: ['', Validators.required],
      value1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      label2: ['', Validators.required],
      value2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      label3: ['', Validators.required],
      value3: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const queryParams = {
        label1: this.form.value.label1,
        value1: this.form.value.value1,
        label2: this.form.value.label2,
        value2: this.form.value.value2,
        label3: this.form.value.label3,
        value3: this.form.value.value3,
      };

      this.router.navigate(['/charts/user-pie'], { queryParams });
    }
  }
}
