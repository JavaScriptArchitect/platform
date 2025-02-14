import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-user-pie',
  templateUrl: './user-pie.component.html',
  styleUrls: ['./user-pie.component.scss']
})
export class UserPieComponent implements OnInit {
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#035388', '#40c3f7', '#b3ecff'],
        hoverBackgroundColor: ['#a2c5ff', '#86b4ff', '#3b86fe'],
        hoverBorderColor: ['#3b86fe', '#2e69c9', '#1b3e76']
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.doughnutChartData.labels = [params.label1, params.label2, params.label3];
      this.doughnutChartData.datasets[0].data = [+params.value1, +params.value2, +params.value3];
    });
  }

  updateChart(): void {
    this.router.navigate(['/charts/formPie']);
  }
}
