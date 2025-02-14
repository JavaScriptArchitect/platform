import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGenAIComponent } from './video-genai/video-genai.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { InsightComponent } from './insight/insight.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { LongLambdaComponent } from './long-lambda/long-lambda.component';
import { StorageCloudComponent } from './storage-cloud/storage-cloud.component';


const routes: Routes = [

  { path: '', component: KnowledgeComponent },
  { path: 'sentiment', component: SentimentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: StorageCloudComponent },
  { path: 'insights', component: InsightComponent },
  { path: 'largelambda', component: LongLambdaComponent },
  { path: 'kb', component: KnowledgeComponent },
  { path: 'video-genai', component: VideoGenAIComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RagRoutingModule { }
