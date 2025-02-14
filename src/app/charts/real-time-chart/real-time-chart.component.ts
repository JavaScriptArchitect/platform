import { Component, OnInit, OnDestroy } from '@angular/core';

export const single = [
  {
    "name": "Germany",
    "value": 8940000,
    "growthRate": 0.01 // Annual growth rate
  },
  {
    "name": "USA",
    "value": 5000000,
    "growthRate": 0.015 // Annual growth rate
  },
  {
    "name": "France",
    "value": 7200000,
    "growthRate": 0.012 // Annual growth rate
  },
  {
    "name": "UK",
    "value": 6200000,
    "growthRate": 0.011 // Annual growth rate
  }
];

@Component({
  selector: 'app-realtime-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.scss']
})
export class RealtimeChartComponent implements OnInit, OnDestroy {

  data: any[] = single;
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1'] // Updated color scheme
  };

  private updateInterval: any;
  private time: number = 0; // Initial time in years

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
    }, 3000); // Update every 3 seconds
  }

  updatePopulationData(): void {
    this.time += 1; // Increment time in years
    this.data = this.data.map((item) => {
      const newValue = item.value * Math.exp(item.growthRate * this.time);
      return {
        ...item,
        value: Math.floor(newValue)
      };
    });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
