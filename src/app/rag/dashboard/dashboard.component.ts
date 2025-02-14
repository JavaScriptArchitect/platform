import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatingService } from '@app/services/dating.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  inputText: string = '';
  file: File | null = null;
  result: any;
  fileData: string | null = null;
  loading: boolean = false;
  error: string | null = null;
  fileType: string | null = null;

  constructor(private informaticsService: DatingService) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      const fileType = this.file.type;
      if (fileType.startsWith('image/')) {
        this.fileType = 'image';
      } else if (fileType === 'application/pdf') {
        this.fileType = 'pdf';
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.inputText || !this.file) {
      alert('Both prompt (inputText) and file are mandatory.');
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const response = await this.informaticsService.uploadFileAndInvokeAgent(this.inputText, this.file);
      this.result = response;
      console.log('Lambda response:', this.result);

      // Get the base64-encoded file from the Lambda response
      if (this.result.fileType === 'image') {
        this.fileData = `data:image/jpeg;base64,${this.result.file}`;
      } else if (this.result.fileType === 'pdf') {
        this.fileData = `data:application/pdf;base64,${this.result.file}`;
      }
    } catch (error) {
      console.error('Error:', error);
      this.error = 'An error occurred while processing your request.';
    } finally {
      this.loading = false;
    }
  }
}
