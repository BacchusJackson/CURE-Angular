import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { FlashMessagesModule, FlashMessagesService } from "angular2-flash-messages";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

//Material Design Stuff
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule, MatCard } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogComponent } from './components/log/log.component';
import { HelpComponent } from './components/help/help.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from "./services/validate.service";
import { AuthGuard } from './guards/auth.guard';

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
    FlashMessagesModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);