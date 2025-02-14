import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OcrSentimentService {
  private s3Client: S3Client;
  private lambdaUrl: string = 'https://wptdz7frmqv73yvoc7gmd3bleq0vptcw.lambda-url.us-east-1.on.aws/';
  public s3Bucket: string = environment.S3_BUCKET;

  constructor(private http: HttpClient) {
    this.s3Client = new S3Client({
      region: environment.AWS_REGION,
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY
      }
    });
  }

  uploadFileToS3(file: File, imageName: string): Observable<any> {
    const sanitizedImageName = this.sanitizeFileName(imageName);
    const command = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: sanitizedImageName,
      Body: file,
      ContentType: file.type
    });

    return from(this.s3Client.send(command)).pipe(
      catchError((error: S3ServiceException) => {
        console.error('Error uploading file:', error.message);
        return throwError(error);
      })
    );
  }

  async uploadFileWithDelay(inputText: string, file: File): Promise<any> {
    const sanitizedImageName = this.sanitizeFileName(file.name);
    
    // Upload file to S3
    await this.uploadFileToS3(file, sanitizedImageName).toPromise();
    
    // Add 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Proceed with invoking the Lambda function
    return this.processFileWithLambda(inputText, sanitizedImageName);
  }

  async processFileWithLambda(inputText: string, fileKey: string): Promise<any> {
    try {
      const headers = new HttpHeaders({
        'header1': inputText,
        'header2': this.s3Bucket,
        'header3': fileKey
      });
      return this.http.post(this.lambdaUrl, null, { headers }).pipe(
        catchError((error: any) => {
          console.error('Error invoking Lambda function:', error.message);
          return throwError(error);
        })
      ).toPromise();
    } catch (error: any) {
      console.error('Detailed error:', error);
      throw new Error(`Failed to process request: ${error.message}`);
    }
  }

  private sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, '');
  }
}
