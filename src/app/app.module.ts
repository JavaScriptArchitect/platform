import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Assuming you have a routing module
import { AppComponent } from './app.component';
import { BehaviorFilesComponent } from './behavior-files/behavior-files.component';
import { TodosComponent } from './todos/todos.component'; // Assuming you have a TodosComponent
import { BehaviorService } from './services/behavior.service'; // Import the BehaviorService
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    BehaviorFilesComponent,
    TodosComponent // Declare your components
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    AppRoutingModule // Import the AppRoutingModule
  ],
  providers: [BehaviorService], // Provide the BehaviorService
  bootstrap: [AppComponent]
})
export class AppModule { }
