import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

if (environment.production) {
  enableProdMode();
}

// Configure AWS Amplify
Amplify.configure(awsExports);

platformBrowser()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
