import { Component, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent {

  isBrowser: boolean;
  companyData: any[] = [];
  isLoading = false;
  selectedDate: { year: number, month: number, day: number };
  displayDate: Date;
  stockData: any;

  verticalBarOptions = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showGridLines: true,
    barPadding: 50,
    showXAxisLabel: true,
    xAxisLabel: 'Company',
    showYAxisLabel: true,
    yAxisLabel: 'Close'
  };

  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1']
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: object, 
    private marketService: MarketService, 
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  fetchStockData(): void {
    if (this.selectedDate) {
      this.displayDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
      const dateStr = `${this.selectedDate.year}-${this.pad(this.selectedDate.month)}-${this.pad(this.selectedDate.day)}`;
      this.isLoading = true;
      this.marketService.getStockData(dateStr, dateStr).subscribe({
        next: (data: any) => {
          this.stockData = data;
          this.updateChartData();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching stock data:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No date selected');
    }
  }

  updateChartData(): void {
    if (this.stockData) {
      this.companyData = this.stockData.slice(0, 5).map((item: any) => ({
        name: item.symbol,
        value: item.close
      }));
      this.cdr.detectChanges();  // Manually trigger change detection
    }
  }

  pad(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}
