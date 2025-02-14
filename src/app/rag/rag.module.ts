import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RagRoutingModule } from './rag-routing.module';
import { VideoGenAIComponent } from './video-genai/video-genai.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { TriggersComponent } from './triggers/triggers.component';
import { BehaviorService } from '../services/behavior.service';
import { OcrSentimentService } from '../services/ocrlambda.service';
import { DatingService } from '../services/dating.service';



import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {

  NgbProgressbarModule,
  NgbDatepickerModule,
  NgbRatingModule,
  NgbTimepickerModule,
  NgbPopoverModule,
  NgbCarouselModule,
  NgbNavModule,
  NgbTypeaheadModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { InsightComponent } from './insight/insight.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { LoveComponent } from './love/love.component';
import { LongLambdaComponent } from './long-lambda/long-lambda.component';
import { KnowledgeBaseService } from '@app/services/knowledgebase.service';
import { LongLambdaService } from '@app/services/longlambda.service';
import { StorageCloudComponent } from './storage-cloud/storage-cloud.component';

@NgModule({
  declarations: [
    TriggersComponent,
    SentimentComponent,
    VideoGenAIComponent,
    InsightComponent,
    KnowledgeComponent,
    LoveComponent,
    LongLambdaComponent,
    StorageCloudComponent
  ],
  providers: [
  BehaviorService,
  OcrSentimentService,
  DatingService,
  KnowledgeBaseService,
  LongLambdaService
  ],
  imports: [
    CommonModule,
    FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatInputModule,
        MatNativeDateModule,
        MatChipsModule,
        MatSelectModule,
        MatStepperModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSliderModule,
        MatIconModule,  //  use the MatIconRegistry for custom icons
        // ng bootstrap modules
        NgbToastModule,
        NgbProgressbarModule,
        NgbDatepickerModule,
        NgbRatingModule,
        NgbTimepickerModule,
        NgbPopoverModule,
        NgbCarouselModule,
        NgbNavModule,
        NgbTypeaheadModule,
        NgbDropdownModule,
        RagRoutingModule
  ]
})
export class RagModule { }
