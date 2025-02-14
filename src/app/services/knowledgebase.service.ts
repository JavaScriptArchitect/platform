import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface LambdaResponse {
  prompt: string;
  response: string;
  requestId?: string;
  tokenCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {
  private lambdaUrl: string = 'https://j6aysvdvz3pgc7tqnfsbcw3nma0dgwgr.lambda-url.us-east-1.on.aws';

  constructor(private http: HttpClient) {}

  invokeLambdaWithPrompt(prompt: string): Observable<LambdaResponse> {
    const headers = new HttpHeaders({
      'header1': prompt
    });

    return this.http.post<any>(this.lambdaUrl, null, { headers }).pipe(
      map(response => {
        // Log the raw response for debugging
        console.log('Raw response:', response);

        // Handle the response structure properly
        let parsedResponse;
        try {
          parsedResponse = typeof response === 'string' 
            ? JSON.parse(response) 
            : response;

          // If response has a body property, use that
          if (parsedResponse.body) {
            parsedResponse = typeof parsedResponse.body === 'string'
              ? JSON.parse(parsedResponse.body)
              : parsedResponse.body;
          }
        } catch (e) {
          console.error('Error parsing response:', e);
          throw new Error('Invalid response format');
        }

        // Create response object with safe fallbacks
        return {
          prompt: prompt, // Use the original prompt
          response: this.formatResponse(parsedResponse?.response || parsedResponse?.sentiment_analysis || ''),
          requestId: parsedResponse?.requestId || undefined,
          tokenCount: parsedResponse?.tokenCount || undefined
        };
      }),
      catchError((error: any) => {
        console.error('Error invoking Lambda function:', error);
        return throwError(() => error);
      })
    );
  }

  private formatResponse(response: string): string {
    if (!response) return '';
    return response.replace(/^\n+|\n+\$/g, '').trim();
  }
}