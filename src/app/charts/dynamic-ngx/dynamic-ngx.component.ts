import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-ngx',
  templateUrl: './dynamic-ngx.component.html',
  styleUrls: ['./dynamic-ngx.component.scss']
})
export class DynamicNgxComponent implements OnInit {
  form: FormGroup;
  countriesData = [
    { name: 'Germany', value: 2500 },
    { name: 'USA', value: 4000 },
    { name: 'Spain', value: 1700 },
    { name: 'India', value: 2000 },
    { name: 'France', value: 1200 }
  ];

  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1']
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Germany: [2500],
      USA: [4000],
      Spain: [1700],
      India: [2000],
      France: [1200]
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      this.countriesData = [
        { name: 'Germany', value: values.Germany },
        { name: 'USA', value: values.USA },
        { name: 'Spain', value: values.Spain },
        { name: 'India', value: values.India },
        { name: 'France', value: values.France }
      ];
    });
  }
}
