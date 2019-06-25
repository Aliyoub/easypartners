import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { OperationComponent } from './operation/operation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MyAdminComponent } from './my-admin/my-admin.component';
import { DialogComponent } from './my-admin/dialog/dialog.component';

import { firebaseConfig } from '../environments/environment';

import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';


import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule
} from '@angular/material';
/* import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter  } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'; */
//import { } from '@angular/material-moment-adapter';



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
  {
    path: 'myad2675min',
    component: MyAdminComponent,
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
    MyAdminComponent,
    DialogComponent
  ],
  imports: [
    AngularFireAuthModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    /* MatMomentDateModule */
  ],
  providers: [],
  /* providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ], */
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
