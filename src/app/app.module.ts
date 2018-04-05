import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Materials Stuff
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_LABEL_GLOBAL_OPTIONS, MatIconRegistry } from "@angular/material";
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Components
import { AppComponent } from 'app/app.component';
import { SessionComponent } from 'app/session/session.component';
import { SignOnComponent } from 'app/session/sign-on/sign-on.component';
import { SignInComponent } from 'app/session/sign-in/sign-in.component';
import { ProjectListComponent } from 'app/projects/project-list/project-list.component';
import { AddProjectDialog } from 'app/projects/project-list/project-list.component';
import { ProjectByIdComponent } from './projects/project-by-id/project-by-id.component';

//Modelos
import { restPath } from "app/share/constants/restPath";
import { Project } from "app/models/project";
import { User } from "app/models/user";

//Services
import { SessionService } from "app/session/service/session.service";
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";

//Interceptors
import { AuthInterceptorService } from "app/interceptors/auth-interceptor.service";

//Guards
import { authGuard } from "app/share/guards/authenticate-guard";

const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-on', component: SignOnComponent },
  { path: '', redirectTo: '/sign-on', pathMatch: 'full' },
  { path: 'project-list', component: ProjectListComponent, canActivate: [authGuard] },
  { path: 'project/:id', component: ProjectByIdComponent, canActivate: [authGuard] }
];


@NgModule({
  entryComponents: [AddProjectDialog],
  declarations: [
    AppComponent,
    SessionComponent,
    SignOnComponent,
    SignInComponent,
    ProjectListComponent,
    AddProjectDialog,
    ProjectByIdComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
        {
          provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } 
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
           multi: true
        },
          SessionService,
          restPath,
          Project,
          User,
          ProjectsService,
          UsersService,
          authGuard
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
