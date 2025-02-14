import { Component, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-stock-drag-drop',
  templateUrl: './stock-drag-drop.component.html',
  styleUrls: ['./stock-drag-drop.component.scss']
})
export class StockDragDropComponent {
  isBrowser: boolean;
  isLoading = false;
  stockDetails: any[] = [];
  availableSymbols: string[] = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'ADBE', 'INTC', 'CSCO', 'CRM', 'AMD', 'ORCL', 'IBM', 'NFLX', 'TXN', 'QCOM', 'AVGO', 'NOW', 'SHOP', 'ZM', 'OKTA', 'TWLO', 'DOCU', 'SQ'];
  selectedSymbols: string[] = [];
  dateFrom: string;

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
    if (this.selectedSymbols.length === 4 && this.dateFrom) {
      this.isLoading = true;
      this.marketService.getStockDetails(this.dateFrom, this.selectedSymbols).subscribe({
        next: (data: any) => {
          if (data && Array.isArray(data)) {
            this.stockDetails = this.parseStockDetails(data);
          } else {
            console.error('Unexpected data format:', data);
          }
          this.isLoading = false;
          this.cdr.detectChanges();  // Manually trigger change detection
        },
        error: (error) => {
          console.error('Error fetching stock details:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Four symbols and a date must be selected');
    }
  }
  
  
  


  
  parseStockDetails(data: any[]): any[] {
    console.log('Raw data received:', data);
    return data.map((item: any) => {
      const high = item.high !== undefined && item.high !== null && !isNaN(item.high) ? item.high : 0;
      const low = item.low !== undefined && item.low !== null && !isNaN(item.low) ? item.low : 0;
      const close = item.close !== undefined && item.close !== null && !isNaN(item.close) ? item.close : 0;
  
      console.log(`Processing item: ${item.symbol}, High: ${high}, Low: ${low}, Close: ${close}`);
  
      return {
        name: item.symbol,
        series: [
          {
            name: 'High',
            value: high.toString()
          },
          {
            name: 'Low',
            value: low.toString()
          },
          {
            name: 'Close',
            value: close.toString()
          }
        ]
      };
    });
  }
  
  

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, symbol: string) {
    event.dataTransfer.setData('text', symbol);
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const symbol = event.dataTransfer.getData('text');
    if (this.selectedSymbols.length < 4 && !this.selectedSymbols.includes(symbol)) {
      this.selectedSymbols.push(symbol);
    }
  }

  removeSymbol(symbol: string) {
    this.selectedSymbols = this.selectedSymbols.filter(s => s !== symbol);
  }

  validateDate(event: any): void {
    const selectedDate = new Date(event.target.value);
    const day = selectedDate.getUTCDay();
    
    // Check if the selected day is Monday (1) to Friday (5)
    if (day === 0 || day === 6) {
      this.dateFrom = '';
      alert('Please select a date between Monday and Friday.');
    }
  }
}
