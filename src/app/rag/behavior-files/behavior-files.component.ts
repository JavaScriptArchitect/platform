import { Component } from '@angular/core';
import { BehaviorService } from '../../services/behavior.service';


@Component({
  selector: 'app-behavior-files',
  templateUrl: './behavior-files.component.html',
  styleUrls: ['./behavior-files.component.scss']
})
export class BehaviorFilesComponent { // Ensure the class name matches your template usage
  inputText: string = '';
  file: File | null = null;
  result: any;
  loading: boolean = false;
  error: string | null = null;

  constructor(private behaviorService: BehaviorService) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }
// this has to be moved to amplify 
  getS3Url(fileUrl: string): string {
    return `https://s3.amazonaws.com/${this.result.s3Bucket}/${fileUrl}`;
  }

  isFile(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp|pdf)$/i.test(url);
  }

  async onSubmit(): Promise<void> {
    if (!this.inputText || !this.file) {
      alert('Both prompt (inputText) and file are mandatory.');
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const response = await this.behaviorService.uploadFileAndInvokeAgent(this.inputText, this.file);
      this.result = response; // Assign the response to the result property
      console.log('Agent response:', this.result);
    } catch (error) {
      console.error('Error:', error);
      this.error = 'An error occurred while processing your request.';
    } finally {
      this.loading = false;
    }
  }
}
