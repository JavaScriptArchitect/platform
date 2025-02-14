
import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ThemeOption } from 'ngx-echarts';
import { CustomEChartsTheme } from '../../../theme/custom-echarts-theme';
@Component({
  selector: 'app-dynamic-pie',
  templateUrl: './dynamic-pie.component.html',
  styleUrls: ['./dynamic-pie.component.scss']
})
export class DynamicPieComponent implements OnInit {


    isBrowser: boolean;
    form: FormGroup;
  
    customEChartsTheme: string | ThemeOption = CustomEChartsTheme;
  
    multiplePieChartOption: any;
  
    constructor(@Inject(PLATFORM_ID) private platformId: object, private fb: FormBuilder) {
      this.isBrowser = isPlatformBrowser(platformId);
      this.createForm();
    }
  
    ngOnInit() {
      this.form.valueChanges.subscribe(values => {
        this.updateChartOptions(values);
      });
    }
  
    createForm() {
      this.form = this.fb.group({
        Development: [68],
        Design: [50],
        Testing: [40]
      });
      this.updateChartOptions(this.form.value);
    }
  
    updateChartOptions(values: any) {
      this.multiplePieChartOption = {
        tooltip: {
          trigger: 'none'
        },
        legend: {
          type: 'plain',
          orient: 'vertical',
          icon: 'circle',
          left: 'left',
          data: ['Development', 'Design', 'Testing']
        },
        series: [
          {
            name: 'Development',
            type: 'pie',
            clockwise: true,
            emphasis: {
              scale: true,
              scaleSize: 1
            },
            radius: [105, 130],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: values.Development,
                name: 'Development',
                itemStyle: {
                  borderRadius: '50%'
                }
              },
              {
                value: 100 - values.Development,
                name: 'invisible',
                itemStyle: {
                  color: '#FFF',
                  borderRadius: 0
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#FFF'
                  }
                }
              }
            ]
          },
          {
            name: 'Design',
            type: 'pie',
            clockwise: true,
            emphasis: {
              scale: true,
              scaleSize: 1
            },
            radius: [75, 100],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: values.Design,
                name: 'Design',
                itemStyle: {
                  borderRadius: '50%'
                }
              },
              {
                value: 100 - values.Design,
                name: 'invisible',
                itemStyle: {
                  color: '#FFF',
                  borderRadius: 0
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#FFF'
                  }
                }
              }
            ]
          },
          {
            name: 'Testing',
            type: 'pie',
            clockwise: true,
            emphasis: {
              scale: true,
              scaleSize: 1
            },
            radius: [45, 70],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: values.Testing,
                name: 'Testing',
                itemStyle: {
                  borderRadius: '50%'
                }
              },
              {
                value: 100 - values.Testing,
                name: 'invisible',
                itemStyle: {
                  color: '#FFF',
                  borderRadius: 0
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#FFF'
                  }
                }
              }
            ]
          }
        ]
      };
    }
  }
  
