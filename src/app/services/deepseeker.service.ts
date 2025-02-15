import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeepSeekingService {
  private lambdaUrl = 'arn:aws:bedrock:us-west-2:857375868088:imported-model/8hjv92q98u8l';

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