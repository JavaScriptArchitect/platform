import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RagRoutingModule } from './rag-routing.module';
import { VideoGenAIComponent } from './video-genai/video-genai.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { TriggersComponent } from './triggers/triggers.component';
import { BehaviorService } from '../services/behavior.service';
import { OcrSentimentService } from '../services/ocrlambda.service';
import { DatingService } from '../services/dating.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TriggersComponent,
    SentimentComponent,
    VideoGenAIComponent
  ],
  providers: [
  BehaviorService,
  OcrSentimentService,
  DatingService
  ],
  imports: [
    CommonModule,
    FormsModule,
    RagRoutingModule
  ]
})
export class RagModule { }
