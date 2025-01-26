import { Component } from '@angular/core';
import { BehaviorService } from '../services/behavior.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-behavior-files',
  templateUrl: './behavior-files.component.html',
  styleUrls: ['./behavior-files.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BehaviorFilesComponent {
  inputText: string = '';
  selectedFile: File | null = null;
  result: any;
  loading: boolean = false;
  error: string | null = null;

  constructor(private behaviorService: BehaviorService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const fileType = this.selectedFile.type;
      if (!fileType.includes('pdf') && !fileType.includes('msword') && !fileType.includes('jpeg') && !fileType.includes('png')) {
        alert('Please upload a valid document or image.');
        this.selectedFile = null;
      }
    }
  }

  async onSubmit() {
    if (!this.inputText.trim() || !this.selectedFile) {
      alert("You must provide both a prompt and a file.");
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      this.result = await this.behaviorService.uploadFileAndInvokeAgent(this.inputText, this.selectedFile);
    } catch (error) {
      console.error(error);
      this.error = 'An error occurred while processing your request.';
    } finally {
      this.loading = false;
    }
  }

  isImage(fileUrl: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(extension || '');
  }

  getS3Url(fileUrl: string): string {
    return `${this.behaviorService.s3BucketUrl}${fileUrl}`;
  }
}
