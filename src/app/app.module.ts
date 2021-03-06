import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { QuillModule } from 'ngx-quill';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AuthGuardService } from './services/auth-guard.service';


import { firebaseConfig } from '../environments/environment';
import { OperationComponent } from './operation/operation.component';


const appRoutes: Routes = [
  { path: 'project/:id',
    canActivate: [AuthGuardService],
    component: ProjectDetailsComponent,
  },
  {
    path: 'projects',
    component: ProjectsListComponent,
  },
  {
    path: 'operation',
    component: OperationComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },

  { path: 'editform',
    canActivate: [AuthGuardService],
    component: EditFormComponent,
  },

  { path: '', // On est redirigé vers la liste des annonces quand aucun nom de page n'est spécifié
  redirectTo: 'projects',
  pathMatch: 'full' },

  { path: '**', // On est redirigé vers la liste des annonces quand la page n'est pas trouvée
    component: ProjectsListComponent,
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    ProjectsListComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ProjectDetailsComponent,
    EditFormComponent,
    PageNotFoundComponent,
    OperationComponent,
  ],
  imports: [
    AngularFireAuthModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    QuillModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
