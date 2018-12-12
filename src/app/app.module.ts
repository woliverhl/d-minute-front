import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ToastModule } from 'ng2-toastr';

//Materials Stuff
import { MAT_LABEL_GLOBAL_OPTIONS, MatIconRegistry } from "@angular/material";
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

//CDK
import { OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import {CdkTableModule} from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from 'app/app.component';
import { SessionComponent } from 'app/session/toolbar/session.component';
import { FooterComponent } from 'app/session/footer/footer.component';
import { BreadcrumbComponent } from 'app/session/breadcrumb/breadcrumb.component';
import { SignOnComponent } from 'app/session/sign-on/sign-on.component';
import { SignInComponent } from 'app/session/sign-in/sign-in.component';
import { ProjectListComponent } from 'app/projects/project-list/project-list.component';
import { ProjectDetailsComponent } from 'app/projects/project-details/project-details.component';
import { SpinnerComponent } from './share/spinner/spinner.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { AddUserComponent } from './user/create-user/add-user';
import { AddProjectDialog } from './projects/project-list/add-project-dialog';
import { AddMeetingComponent } from './projects/project-details/sintaxis/add-meeting';
import { AddTemaComponent } from './projects/project-details/sintaxis/add-tema';
import { AddElementoDialogoComponent } from './projects/project-details/sintaxis/add-elemento-dialogo';
import { DelProjectDialog } from './projects/project-list/del-project-dialog';
import { delMeetingComponent } from './projects/project-details/del-acta-dialog';
import { delTemaComponent } from './projects/project-details/del-tema-dialog';
import { MsgErrorDialog } from 'app/interceptors/msg-error-dialog';

//Modelos
import { restPath } from "app/share/constants/restPath";
import { Project } from "app/models/project";
import { User } from "app/models/user";
import { Reunion } from "app/models/reunion";
import { Usuario } from "app/models/usuario";
import { TemaActa } from 'app/models/tema';
import { ActaDialogica } from './models/ActaDialogica';
import { ElementoDialogo } from './models/ElementoDialogo';

//Services
import { SessionService } from "app/session/service/session.service";
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { SpinnerService } from "app/share/spinner/spinner.service";
import { TemaService } from './projects/service/tema-service.service';
import { ActaService } from './projects/service/acta-service.service';
import { ElementoDialogoService } from './projects/service/elemento-service.service';

//Interceptors
import { AuthInterceptorService } from "app/interceptors/auth-interceptor.service";

//Guards
import { authGuard } from "app/share/guards/authenticate-guard";

//pipes
import { CapitalizePipe } from "./share/pipe/capitalize-pipe";

//Social login
import { SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';
import { getAuthServiceConfigs } from './share/constants/socialloginConfig';


const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
  { path: 'sign-on', component: SignOnComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/sign-on', pathMatch: 'full' },
  { path: 'project-list', component: ProjectListComponent, canActivate: [authGuard] },
  { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [authGuard] }
];

@NgModule({
  entryComponents: [
    AddProjectDialog,
    DelProjectDialog,
    SpinnerComponent,
    AddUserComponent,
    AddMeetingComponent,
    AddTemaComponent,
    delMeetingComponent,
    delTemaComponent,
    AddElementoDialogoComponent,
    MsgErrorDialog
  ],
  declarations: [
    AppComponent,
    SessionComponent,
    SignOnComponent,
    SignInComponent,
    ProjectListComponent,
    AddProjectDialog,
    DelProjectDialog,
    delMeetingComponent,
    delTemaComponent,
    SpinnerComponent,
    ProjectDetailsComponent,
    UsersListComponent,
    AddUserComponent,
    FooterComponent,
    BreadcrumbComponent,
    CapitalizePipe,
    AddMeetingComponent,
    AddTemaComponent,
    AddElementoDialogoComponent,
    MsgErrorDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    OverlayModule,
    PortalModule,
    MatTabsModule,
    MatCheckboxModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    SocialLoginModule 
  ],
  providers: [
        {
          provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } 
        },{ 
          provide: OverlayContainer, useClass: FullscreenOverlayContainer 
        },{
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        },
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        },
          SessionService,
          restPath,
          Project,
          User,
          Usuario,
          Reunion,
          ProjectsService,
          TemaService,
          ActaService,
          UsersService,
          ElementoDialogoService,
          authGuard,
          TemaActa,
          ActaDialogica,
          ElementoDialogo,
          SpinnerService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
