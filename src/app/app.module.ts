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
//import { SignupComponent } from './signup/signup.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditFormComponent } from './edit-form/edit-form.component';


import { firebaseConfig } from '../environments/environment';


const appRoutes: Routes = [
  { path: 'project/:id', component: ProjectDetailsComponent },
  {
    path: 'projects',
    component: ProjectsListComponent,
    //data: { title: 'Liste des projets' }
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'editform',
    component: EditFormComponent,
  }

  /*,
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }*/
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    ProjectsListComponent,
    FooterComponent,
    SigninComponent,
    //SignupComponent,
    ProjectDetailsComponent,
    EditFormComponent,
    PageNotFoundComponent,
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
