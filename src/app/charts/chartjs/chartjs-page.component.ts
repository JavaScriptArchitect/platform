import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-chartjs-page',
  templateUrl: './chartjs-page.component.html',
  styleUrls: ['./chartjs-page.scss']
})
export class ChartsJsPageComponent {
  isBrowser: boolean;

  // * Line Chart
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#035388',
        backgroundColor: 'rgba(3,83,136,0.4)',
        label: 'Transactions'
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };
  public lineChartType: ChartType = 'line';
  // public lineChartColors: Color[] = [
  //   {
  //     borderColor: '#035388',
  //     backgroundColor: 'rgba(3,83,136,0.4)',
  //   },
  // ];


  // * Pie Chart
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  };
  public pieChartLabels: string[] = ['In Store Sales', 'Website Sales', 'Email Sales'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: ['#035388', '#40c3f7', '#b3ecff'],
        hoverBackgroundColor: ['#a2c5ff', '#86b4ff', '#3b86fe'],
        hoverBorderColor: ['#3b86fe', '#2e69c9', '#1b3e76']
      }
    ]
  };
  public pieChartType: ChartType = 'pie';


  // * Bar Chart
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    // scales: {
    //   x: {},
    //   y: {
    //     min: 10
    //   }
    // },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    }
  };
  public barChartLabels: string[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [165, 159, 180, 181, 156, 155, 140, 200],
        label: 'Product A',
        backgroundColor: '#035388',
        borderColor: '#035388',
        hoverBackgroundColor: 'rgb(81,107,145)',
        hoverBorderColor: 'rgb(81,107,145)'
      },
      {
        data: [128, 148, 140, 139, 186, 127, 190, 230],
        label: 'Product B',
        backgroundColor: '#40c3f7',
        borderColor: '#40c3f7'
      }
    ]
  };
  public barChartType: ChartType = 'bar';


  // * Doughnut Chart
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  public doughnutChartLabels: string[] = ['Mobile', 'Desktop', 'Tablet'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [250, 130, 50],
        backgroundColor: ['#035388', '#40c3f7', '#b3ecff'],
        hoverBackgroundColor: ['#a2c5ff', '#86b4ff', '#3b86fe'],
        hoverBorderColor: ['#3b86fe', '#2e69c9', '#1b3e76']
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';


  // * Radar Chart
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  public radarChartLabels: string[] = ['Coding', 'Designing', 'Testing', 'Refactoring', 'Meetings', 'Discovery'];
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        data: [80, 59, 70, 30, 46, 15],
        label: 'Admin Template'
      },
      {
        data: [60, 48, 20, 19, 16, 50],
        label: 'Site Template'
      }
    ]
  };
  public radarChartType: ChartType = 'radar';


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private themeService: ThemeService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.setTheme();
  }

  public setTheme() {
    // ? Available Chart.js configuration options here: https://www.chartjs.org/docs/latest/configuration/
    const overrides: ChartConfiguration['options'] = {
      scales: {
        x: {
          ticks: {
            color: '#999999'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        y: {
          ticks: {
            color: '#999999'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#999999',
            boxWidth: 20,
            padding: 20
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#FFF',
          titleColor: '#999999',
          bodyColor: '#999999',
          caretPadding: 4,
          padding: {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10
          },
          borderColor: '#999999',
          borderWidth: 1
        }
      }
    };

    // ? New Chart.js default configurations (see: https://www.chartjs.org/docs/latest/getting-started/v3-migration.html#defaults)
    Chart.defaults.color = '#999999';
    Chart.defaults.font.family = 'Nunito, sans-serif';
    Chart.defaults.responsive = true;

    this.themeService.setColorschemesOptions(overrides);
  }

}
