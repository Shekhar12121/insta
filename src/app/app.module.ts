import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, DialogBox } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import  { HttpClientModule } from '@angular/common/http';
import { PictureComponent } from './picture/picture.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PictureComponent,
    DialogBox
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogBox],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
