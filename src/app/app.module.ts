import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatingService } from './services/dating.service';
// AWS Amplify Configuration
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OcrSentimentService } from './services/ocrlambda.service';
import { BehaviorService } from './services/behavior.service';
import { NavComponent } from './nav/nav.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    // ...import other modules...
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    DatingService,
    BehaviorService,
    OcrSentimentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
