import { Component, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent {
  isBrowser: boolean;
  isLoading = false;
  selectedDate: { year: number, month: number, day: number };
  displayDate: Date;
  stockDetails: any[] = [];
  selectedSymbols: string[] = [];
  symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'ADBE', 'INTC', 'CSCO', 'CRM', 'AMD', 'ORCL', 'IBM', 'NFLX', 'TXN', 'QCOM', 'AVGO', 'NOW', 'SHOP', 'ZM', 'OKTA', 'TWLO', 'DOCU', 'SQ'];

  horizontalBarOptions = {
    showXAxis: true,
    showYAxis: true,
    showLegend: true,
    showGridLines: false,
    barPadding: 6,
    groupPadding: 30,
    showXAxisLabel: true,
    xAxisLabel: 'Stock Symbol',
    showYAxisLabel: true,
    yAxisLabel: 'Value',
    legendPosition: 'right'
  };

  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1']
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object, private marketService: MarketService, private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  fetchStockDetails(): void {
    if (this.selectedDate && this.selectedSymbols.length === 4) {
      const dateStr = `${this.selectedDate.year}-${this.pad(this.selectedDate.month)}-${this.pad(this.selectedDate.day)}`;
      this.isLoading = true;
      this.marketService.getStockDetails(dateStr, this.selectedSymbols).subscribe({
        next: (data: any) => {
          this.stockDetails = this.parseStockDetails(data);
          this.isLoading = false;
          this.cdr.detectChanges();  // Manually trigger change detection
        },
        error: (error) => {
          console.error('Error fetching stock details:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Date or symbols not selected correctly');
    }
  }

  parseStockDetails(data: any): any[] {
    return data.map((item: any) => ({
      name: item.symbol,
      series: [
        {
          name: 'High',
          value: item.high
        },
        {
          name: 'Low',
          value: item.low
        },
        {
          name: 'Close',
          value: item.close
        }
      ]
    }));
  }

  pad(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}
