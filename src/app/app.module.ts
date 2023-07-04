import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { ContactInformationDialogComponent } from './components/contact-information-dialog/contact-information-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactInformationDialogComponent,
    ContactManagerComponent,
    ViewContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
