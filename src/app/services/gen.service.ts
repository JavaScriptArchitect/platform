import { Injectable } from '@angular/core';
import { uploadData } from 'aws-amplify/storage';
import { Observable, from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageCloudService {
  private progressSubject = new Subject<number>();
  uploadProgress$ = this.progressSubject.asObservable();

  constructor() {
    const config = {
      Storage: {
        bucket: 'bedrock.image.descriptions',
        region: 'us-east-1'
      }
    };
  }

  uploadFile(file: File): Observable<any> {
    return from(new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (event) => {
        if (event.target?.result) {
          try {
            console.log('Starting file upload:', file.name);
            const result = await uploadData({
              data: event.target.result,
              path: file.name,
              options: {
                onProgress: ({ transferredBytes, totalBytes }) => {
                  if (totalBytes) {
                    const progress = Math.round((transferredBytes / totalBytes) * 100);
                    this.progressSubject.next(progress);
                    console.log(`Upload progress: \${progress}%`);
                  }
                },
              },
            }).result;
            
            console.log('Upload completed. Path:', result.path);
            resolve(result);
          } catch (error) {
            console.error('Upload error:', error);
            reject(error);
          }
        }
      };

      fileReader.onerror = (error) => {
        console.error('File reading error:', error);
        reject(error);
      };
    }));
  }
}