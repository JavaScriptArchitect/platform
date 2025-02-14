import { Component } from '@angular/core';
import { StorageCloudService } from '@app/services/gen.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-storage-cloud',
  templateUrl: './storage-cloud.component.html',
  styleUrls: ['./storage-cloud.component.scss']
})
export class StorageCloudComponent {
  isUploading = false;
  uploadProgress = 0;
  uploadError: string | null = null;
  uploadSuccess = false;

  constructor(private storage: StorageCloudService) {}

  async onFileSelected(event: any) {
    this.resetState();
    const file = event.target.files[0];
    
    if (!file) return;

    try {
      this.isUploading = true;
      const result = await this.storage.uploadFile(file).toPromise();
      this.uploadSuccess = true;
      console.log('Upload successful:', result);
    } catch (error: any) { // Type assertion for error
      this.uploadError = 'Upload failed: ' + (error?.message || 'Unknown error');
      console.error('Upload failed:', error);
    } finally {
      this.isUploading = false;
    }
  }

  private resetState() {
    this.uploadError = null;
    this.uploadSuccess = false;
    this.uploadProgress = 0;
    this.isUploading = false;
  }
}