import { Component } from '@angular/core';
import { AgentService } from '@app/services/agentic.service';

@Component({
  selector: 'app-love',
  templateUrl: './love.component.html',
  styleUrls: ['./love.component.scss']
})
export class LoveComponent {
  agentId = 'your-agent-id';
  agentAliasId = 'your-agent-alias-id';
  sessionId = 'your-session-id';
  inputText = 'your-input-text';
  base64EncodedImage = ''; // Your base64 encoded image string
  result: any;

  constructor(private agentService: AgentService) {}

  invokeAgent() {
    const inputFile = {
      fileName: 'image.jpg',
      contentType: 'image/jpeg',
      data: this.base64EncodedImage
    };

    this.agentService.invokeAgent(this.agentId, this.agentAliasId, this.sessionId, this.inputText, inputFile).subscribe(
      response => {
        console.log('Agent response:', response);
        this.result = response;
      },
      error => {
        console.error('Error invoking agent:', error);
      }
    );
  }

  getAllFiles() {
    this.agentService.getAllFiles().subscribe(
      response => {
        console.log('All files:', response);
        this.result = response;
      },
      error => {
        console.error('Error getting all files:', error);
      }
    );
  }

  invokeLambda() {
    const fileKey = 'your-file-key';
    const rawImage = this.base64EncodedImage;

    this.agentService.invokeLambdaFunction(fileKey, rawImage).subscribe(
      response => {
        console.log('Lambda response:', response);
        this.result = response;
      },
      error => {
        console.error('Error invoking Lambda:', error);
      }
    );
  }
}
