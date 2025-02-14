import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LongLambdaService {
  private lambdaFunctionUrl = 'https://5au7pmludoj7loe6fl5pva2k4y0ppvbz.lambda-url.us-east-1.on.aws/';

  constructor(private http: HttpClient) {}

  invokeLambdaFunction(prompt: string, fileKey: string, rawImage: string): Observable<any> {
    const headers = new HttpHeaders({
      'header1': fileKey,
      'header2': rawImage,
      'header3': prompt
    });

    return this.http.post(this.lambdaFunctionUrl, null, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
