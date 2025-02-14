import { Component } from '@angular/core';
import { KnowledgeBaseService } from '@app/services/knowledgebase.service';

interface LambdaResponse {
  prompt: string;
  response: string;
  requestId?: string;
  tokenCount?: number;
}

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent {
  inputText: string = '';
  result: LambdaResponse | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private kb: KnowledgeBaseService) {}

  onSubmit(): void {
    if (!this.inputText.trim()) {
      alert('Input text is mandatory.');
      return;
    }

    this.loading = true;
    this.error = null;

    this.kb.invokeLambdaWithPrompt(this.inputText).subscribe({
      next: (response) => {
        console.log('Raw Lambda response:', response);
        this.result = response;
        console.log('Lambda response:', this.result);
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'An error occurred while processing your request.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  getParagraphs(text: string): string[] {
    return text?.split('\n').filter(paragraph => paragraph.trim().length > 0) || [];
  }
}