import { Component } from '@angular/core';
import { DeepSeekingService } from '@app/services/deepseeker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  inputText: string = '';  // Note: changed from prompt to inputText to match template
  result: any;
  loading: boolean = false;
  error: string | null = null;

  constructor(private deepSeekingService: DeepSeekingService) {}

  submitPrompt() {
    if (!this.inputText) return;
    
    this.loading = true;
    this.error = null;

    this.deepSeekingService.invokeLambdaWithPrompt(this.inputText)
      .subscribe({
        next: (response) => {
          this.result = response;
          this.loading = false;
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
        }
      });
  }

  getParagraphs(text: string): string[] {
    return text ? text.split('\n').filter(p => p.trim()) : [];
  }
}