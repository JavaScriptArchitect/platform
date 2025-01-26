import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorFilesComponent } from './behavior-files/behavior-files.component';
import { TodosComponent } from './todos/todos.component'; // Assuming you have a TodosComponent

const routes: Routes = [
  { path: 'todo', component: TodosComponent },
  { path: '', redirectTo: '/behavior-files', pathMatch: 'full' },
  { path: 'behavior-files', component: BehaviorFilesComponent },
  { path: '**', redirectTo: '/behavior-files' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
