import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGenAIComponent } from './video-genai/video-genai.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { TriggersComponent } from './triggers/triggers.component';

const routes: Routes = [

  { path: '', component: SentimentComponent },
  { path: 'sentiment', component: SentimentComponent },
  { path: 'triggers', component: TriggersComponent },
  { path: 'video-genai', component: VideoGenAIComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RagRoutingModule { }
