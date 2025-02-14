import { Component } from '@angular/core';
import { ChartsDataService } from '../charts.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private dataService: ChartsDataService) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const jsonData = JSON.parse(e.target.result);
        this.processData(jsonData);
      };
      reader.readAsText(file);
    }
  }

  processData(jsonData: any): void {
    this.dataService.updateData(jsonData);
  }
}
