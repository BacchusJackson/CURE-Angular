import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { FlashMessagesModule, FlashMessagesService } from "angular2-flash-messages";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogComponent } from './components/log/log.component';
import { HelpComponent } from './components/help/help.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from "./services/validate.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewEntryComponent,
    LoginComponent,
    RegisterComponent,
    LogComponent,
    HelpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [ValidateService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
