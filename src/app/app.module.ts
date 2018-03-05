import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_LABEL_GLOBAL_OPTIONS } from "@angular/material";
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SessionComponent } from './session/session.component';
import { SignOnComponent } from './session/sign-on/sign-on.component';
import { SignInComponent } from './session/sign-in/sign-in.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';


const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-on', component: SignOnComponent },
  { path: '', redirectTo: '/sign-on', pathMatch: 'full' },
  { path: 'project-list', component: ProjectListComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    SignOnComponent,
    SignInComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
