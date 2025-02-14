import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';
import { 
  BedrockAgentRuntimeClient, 
  InvokeAgentCommand, 
  FileSourceType, 
  FileUseCase, 
  PayloadPart,
  InvokeAgentCommandInput,
  InputFile
} from "@aws-sdk/client-bedrock-agent-runtime";
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  private s3Client: S3Client;
  private bedrockAgentClient: BedrockAgentRuntimeClient;
  private agentAliasId = environment.AGENT_ALIAS_ID;
  private agentId = environment.AGENT_ID;
  private s3Bucket: string = environment.S3_BUCKET;

  constructor() {
    this.s3Client = new S3Client({
      region: environment.AWS_REGION,
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY
      }
    });

    this.bedrockAgentClient = new BedrockAgentRuntimeClient({
      region: environment.AWS_REGION,
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY
      }
    });
  }

  uploadFileToS3(file: File): Observable<any> {
    const fileKey = `${Date.now()}_${file.name}`;
    console.log('Uploading file to S3:', fileKey);

    const command = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: fileKey,
      Body: file,
      ContentType: file.type
    });

    return from(this.s3Client.send(command)).pipe(
      catchError((error: any) => {  // Use 'any' type for 'error'
        console.error('Error uploading file:', error.message);
        return throwError(() => error);
      })
    );
  }

  async uploadFileAndInvokeAgent(inputText: string, file: File): Promise<any> {
    if (!inputText || !file) {
      throw new Error('Both prompt (inputText) and file are mandatory.');
    }

    try {
      console.log('File upload started');
      const fileKey = `${Date.now()}_${file.name}`;
      const s3Response = await this.uploadFileToS3(file).toPromise();
      console.log('File uploaded successfully:', s3Response);

      const s3Uri = `s3://${this.s3Bucket}/${fileKey}`;
      console.log('S3 URI:', s3Uri);

      // Ensure sessionId matches the required pattern
      const sessionId = `session_${Date.now()}`.replace(/[^a-zA-Z0-9_.:-]/g, '_');

      const inputFile: InputFile = {
        name: fileKey, // Ensure the name matches the file key
        useCase: FileUseCase.CHAT,
        source: {
          sourceType: FileSourceType.S3,
          s3Location: {
            uri: s3Uri
          }
        }
      };

      const input: InvokeAgentCommandInput = {
        agentId: this.agentId,
        agentAliasId: this.agentAliasId,
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

      console.log('Agent Input:', JSON.stringify(input, null, 2));

      const command = new InvokeAgentCommand(input);
      console.log('Invoking agent...');
      const response = await this.bedrockAgentClient.send(command);
      console.log('Agent response received');

      if (!response.completion) {
        throw new Error("Completion is undefined");
      }

      let completion = "";
      for await (const chunkEvent of response.completion) {
        const chunk: PayloadPart | undefined = chunkEvent.chunk;
        if (chunk) {
          const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
          completion += decodedResponse;
          console.log('Received chunk:', decodedResponse);
        }
      }

      return { 
        sessionId, 
        completion,
        s3Uri,
        input
      };
    } catch (error: any) {  // Use 'any' type for 'error'
      console.error('Detailed error:', error);
      throw new Error(`Failed to process request: ${error.message}`);
    }
  }
}
