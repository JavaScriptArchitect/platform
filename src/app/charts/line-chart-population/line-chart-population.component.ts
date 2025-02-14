import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-line-chart-population',
  templateUrl: './line-chart-population.component.html',
  styleUrls: ['./line-chart-population.component.scss']
})
export class LineChartPopulationComponent implements OnInit, OnDestroy {
  data: any[] = single;
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1'] // Updated color scheme
  };

  private updateInterval: any;
  private currentDate = new Date(2000, 0, 1); // Start date

  constructor() { }

  ngOnInit(): void {
    this.startDataUpdates();
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  startDataUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.updatePopulationData();
    }, 1000); // Update every second
  }

  updatePopulationData(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1); // Increment date by 1 day
    this.data = this.data.map((country) => {
      const growthRatePerDay = country.growthRate / 365; // Convert annual growth rate to daily growth rate
      const newValue = country.series[country.series.length - 1].value * Math.exp(growthRatePerDay);
      const newSeries = [...country.series, { name: this.currentDate.toISOString().split('T')[0], value: Math.floor(newValue) }];
      return {
        ...country,
        series: newSeries
      };
    });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}

const single = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2000-01-01",
        "value": 8940000
      }
    ],
    "growthRate": 0.01 // Annual growth rate
  },
  {
    "name": "USA",
    "series": [
      {
        "name": "2000-01-01",
        "value": 5000000
      }
    ],
    "growthRate": 0.015 // Annual growth rate
  },
  {
    "name": "France",
    "series": [
      {
        "name": "2000-01-01",
        "value": 7200000
      }
    ],
    "growthRate": 0.012 // Annual growth rate
  },
  {
    "name": "UK",
    "series": [
      {
        "name": "2000-01-01",
        "value": 6200000
      }
    ],
    "growthRate": 0.011 // Annual growth rate
  }
];
