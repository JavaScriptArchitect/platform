import { Routes } from '@angular/router';
import { BehaviorFilesComponent } from './behavior-files/behavior-files.component';
import { TodosComponent } from './todos/todos.component'; // Assuming you have a TodosComponent

export const routes: Routes = [
  { path: 'todo', component: TodosComponent },
  { path: '', redirectTo: '/behavior-files', pathMatch: 'full' },
  { path: 'behavior-files', component: BehaviorFilesComponent },
  { path: '**', redirectTo: '/behavior-files' } // Wildcard route for a 404 page
];
