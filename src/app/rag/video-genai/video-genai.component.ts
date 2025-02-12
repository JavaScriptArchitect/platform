import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-genai',
  templateUrl: './video-genai.component.html',
  styleUrls: ['./video-genai.component.scss']
})
export class VideoGenAIComponent {
  inputText: string = '';
  result: any;
  loading: boolean = false;
  error: string | null = null;

  constructor(private videoService: VideoService) {}

  async onSubmit(): Promise<void> {
    if (!this.inputText) {
      alert('Prompt (inputText) is mandatory.');
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const response = await this.videoService.generateVideo(this.inputText);
      this.result = response;
      console.log('Lambda response:', this.result);
    } catch (error) {
      console.error('Error:', error);
      this.error = 'An error occurred while processing your request.';
    } finally {
      this.loading = false;
    }
  }
}
