import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';

@Component({
  selector: 'app-custom-doughnut',
  templateUrl: './custom-doughnut.component.html',
  styleUrls: ['./custom-doughnut.component.scss']
})
export class CustomDoughnutComponent implements OnInit {
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

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Disable route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    // Subscribe to router events
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        this.route.queryParams.subscribe(params => {
          this.updateChartData(params);
        });
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.updateChartData(params);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      width: '300px',
      data: {
        Mobile: this.doughnutChartData.datasets[0].data[0],
        Desktop: this.doughnutChartData.datasets[0].data[1],
        Tablet: this.doughnutChartData.datasets[0].data[2]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const queryParams = {
          Mobile: result.Mobile,
          Desktop: result.Desktop,
          Tablet: result.Tablet
        };
        this.router.navigate([], {
          queryParams,
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  private updateChartData(params: any): void {
    if (params['Mobile']) this.doughnutChartData.datasets[0].data[0] = +params['Mobile'];
    if (params['Desktop']) this.doughnutChartData.datasets[0].data[1] = +params['Desktop'];
    if (params['Tablet']) this.doughnutChartData.datasets[0].data[2] = +params['Tablet'];
  }
}
