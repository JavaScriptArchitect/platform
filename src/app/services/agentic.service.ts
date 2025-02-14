import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BedrockAgentRuntimeClient } from '@aws-sdk/client-bedrock-agent-runtime';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'  // This specifies that the service should be provided at the root level
})
export class AgentService {
  private bedrockAgentUrl = 'https://bedrock-agent-url';
  private lambdaFunctionUrl = 'https://3lznfnaxtg3hddjpql3wtvzxyi0kwmcm.lambda-url.us-east-1.on.aws/';
  private bedrockAgentClient: BedrockAgentRuntimeClient;

  constructor(private http: HttpClient) {
    this.bedrockAgentClient = new BedrockAgentRuntimeClient({
      region: environment.AWS_REGION,
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY
      }
    });
  }

  invokeAgent(agentId: string, agentAliasId: string, sessionId: string, inputText: string, inputFile: any): Observable<any> {
    const input = {
      agentId: agentId,
      agentAliasId: agentAliasId,
      sessionId: sessionId,
      inputText: inputText,
      sessionState: {
        sessionAttributes: {
          inputText: inputText
        },
        promptSessionAttributes: {},
        files: [inputFile]
      }
    };

    return this.http.post(this.bedrockAgentUrl, input);
  }

  getAllFiles(): Observable<any> {
    return this.http.get(this.bedrockAgentUrl + '/files');
  }

  invokeLambdaFunction(fileKey: string, rawImage: string): Observable<any> {
    const headers = new HttpHeaders({
      'header1': fileKey,
      'header2': rawImage
    });

    return this.http.post(this.lambdaFunctionUrl, null, { headers });
  }
}