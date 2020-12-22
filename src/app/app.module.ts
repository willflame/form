import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormModule } from './template-form/template-form.module';
@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatTabsModule,

    TemplateFormModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
