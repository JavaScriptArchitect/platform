import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OcrSentimentService } from './services/ocrlambda.service';
// AWS Amplify Configuration
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';


import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
