import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';
import { AppFirebaseModule } from './app-firebase.module';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppMaterialModule } from './app-material.module';
import { EditorFormComponent } from './editor-form/editor-form.component';
// import { MathJaxModule } from 'ngx-mathjax';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditorComponent,
    EditorFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppFirebaseModule,
    AppMaterialModule,
    FontAwesomeModule,
    // MathJaxModule.forRoot({
    //   version: '2.7.5',
    //   config: 'TeX-AMS_HTML',
    //   hostname: 'cdnjs.cloudflare.com'
    // })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
