import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports.js'; // Make sure this file exists
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

Amplify.configure(awsExports);

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});

