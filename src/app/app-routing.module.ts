import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'rag', pathMatch: 'full' },
  { path: 'rag', loadChildren: () => import('./rag/rag.module').then(m => m.RagModule) },
  { path: '**', redirectTo: 'rag' } 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }