import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private lambdaUrl: string = 'https://gw56lq3bbtpk3ywho3ha2oinrm0qsvsi.lambda-url.us-east-1.on.aws/';

  constructor(private http: HttpClient) {}

  async generateVideo(prompt: string): Promise<any> {
    try {
      const headers = new HttpHeaders({
        'header1': prompt
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
}
