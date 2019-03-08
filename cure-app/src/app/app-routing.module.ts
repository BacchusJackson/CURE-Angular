import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogComponent } from './components/log/log.component'
import { HelpComponent } from './components/help/help.component'


const routes: Routes = [
  {path: 'new', component: NewEntryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'log', component: LogComponent},
  {path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
