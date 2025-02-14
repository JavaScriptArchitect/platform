import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartsDataService } from '../charts.service';

@Component({
  selector: 'app-bar-upload',
  templateUrl: './bar-upload.component.html',
  styleUrls: ['./bar-upload.component.scss']
})
export class BarUploadComponent implements OnInit {


  data: any[] = [];
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Category';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private dataSubscription: Subscription;

  constructor(private dataService: ChartsDataService) { }

  ngOnInit(): void {
    this.dataSubscription = this.dataService.data$.subscribe(newData => {
      this.data = newData;
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
