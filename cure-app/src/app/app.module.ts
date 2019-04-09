import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";

//Material Design Stuff
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule, MatCard } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogComponent } from './components/log/log.component';
import { HelpComponent } from './components/help/help.component';
import { ProfileComponent } from './components/profile/profile.component';


import { DataService } from "./services/data.service";
import { ValidateService } from "./services/validate.service";
import { AuthGuard } from './guards/auth.guard';
import { UnitEngagementComponent } from './components/new-entry/unit-engagement/unit-engagement.component';
import { LeaderConsultationComponent } from './components/new-entry/leader-consultation/leader-consultation.component';
import { TrainingComponent } from './components/new-entry/training/training.component';
import { TreatmentComponent } from './components/new-entry/treatment/treatment.component';
import { IndividualCoachingComponent } from './components/new-entry/individual-coaching/individual-coaching.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewEntryComponent,
    LoginComponent,
    RegisterComponent,
    LogComponent,
    HelpComponent,
    ProfileComponent,
    UnitEngagementComponent,
    LeaderConsultationComponent,
    TrainingComponent,
    TreatmentComponent,
    IndividualCoachingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [ValidateService, AuthGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);