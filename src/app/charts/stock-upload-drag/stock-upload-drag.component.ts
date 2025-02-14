import { Component, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-stock-upload-drag',
  templateUrl: './stock-upload-drag.component.html',
  styleUrls: ['./stock-upload-drag.component.scss']
})
export class StockUploadDragComponent {
  isBrowser: boolean;
  isLoading = false;
  stockDetails: any[] = [];
  availableSymbols: string[] = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'ADBE', 'INTC', 'CSCO', 'CRM', 'AMD', 'ORCL', 'IBM', 'NFLX', 'TXN', 'QCOM', 'AVGO', 'NOW', 'SHOP', 'ZM', 'OKTA', 'TWLO', 'DOCU', 'SQ'];
  selectedSymbols: string[] = [];
  dateFrom: string;
  errorMessage: string = '';

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
      this.errorMessage = 'Please select 4 symbols and a date.';
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

  handleFileInput(files: FileList) {
    if (files.length === 0) {
      this.errorMessage = 'No file selected.';
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const symbols = JSON.parse(e.target.result);
        if (Array.isArray(symbols) && symbols.every(symbol => typeof symbol === 'string')) {
          this.availableSymbols = symbols;
          this.errorMessage = '';
        } else {
          throw new Error('Invalid file format.');
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        this.errorMessage = 'Invalid file format. Please upload a valid JSON file containing an array of stock symbols.';
      }
    };
    reader.readAsText(file);
  }
}
