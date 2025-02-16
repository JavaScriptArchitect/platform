import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeepSeekingService {
  private lambdaUrl = 'https://jx6vsgk5of7flswko5rnk4jjqm0bdyzv.lambda-url.us-west-2.on.aws/';

  constructor(private http: HttpClient) {}

  invokeLambdaWithPrompt(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'header1': prompt
    });

    return this.http.post(this.lambdaUrl, {}, { headers })
      .pipe(
        catchError(error => { throw error; })
      );
  }
}