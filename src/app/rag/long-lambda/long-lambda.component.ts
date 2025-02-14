import { Component } from '@angular/core';
import { LongLambdaService } from '@app/services/longlambda.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-long-lambda',
  templateUrl: './long-lambda.component.html',
  styleUrls: ['./long-lambda.component.scss']
})
export class LongLambdaComponent {
  inputText: string = '';
  file: File | null = null;
  result: any;
  fileData: string | null = null;
  loading: boolean = false;
  error: string | null = null;
  fileType: string | null = null;

  constructor(private longServe: LongLambdaService) {}

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

  onSubmit(): void {
    if (!this.inputText || !this.file) {
      alert('Both prompt (inputText) and file are mandatory.');
      return;
    }

    this.loading = true;
    this.error = null;

    const reader = new FileReader();
    reader.onload = () => {
      const base64File = (reader.result as string).split(',')[1];
      const fileKey = this.file?.name || '';

      this.longServe.invokeLambdaFunction(this.inputText, fileKey, base64File)
        .subscribe({
          next: (response) => {
            this.result = response;
            console.log('Lambda response:', this.result);

            // Get the base64-encoded file from the Lambda response
            if (this.result.rawImage) {
              this.fileData = `data:image/jpeg;base64,${this.result.rawImage}`;
            }
            this.loading = false;
          },
          error: (error) => {
            console.error('Error:', error);
            this.error = 'An error occurred while processing your request.';
            this.loading = false;
          }
        });
    };

    reader.readAsDataURL(this.file);
  }
}
