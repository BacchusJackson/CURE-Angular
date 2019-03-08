import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEntryComponent } from './components/new-entry/new-entry.component';

const routes: Routes = [
  {path: 'new', component: NewEntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
