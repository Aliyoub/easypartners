import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import { DateAdapter } from '@angular/material/core';
import { MyAdminDataSource } from './my-admin-datasource';
import { Project } from '../project.model';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-my-admin',
  templateUrl: './my-admin.component.html',
  styleUrls: ['./my-admin.component.css']
})

export class MyAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MyAdminDataSource;

  projects: Project[];
  projectKeys: string[];
  projectsSubscription: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'country', 'category', 'actions'];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
    private _adapter: DateAdapter<any>) {}

  openDialog(key): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.projectService.getSingleProject(key).then(
      (project: Project) => {
        //this.project = project;
        //console.log(project);

    dialogConfig.data = {
      date: project.date,
      country: project.country,
      category: project.category,
      projectContent: project.projectContent,
      key: key // Pour récupérer la clé qui sera utilisée dans DialogComponent)
    };

    // this.dialog.open(DialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
});
  }

  onDeleteProject(key){
    this.projectService.deleteProject(key);
  }


  ngOnInit(){
    ///this.dataSource = new MyAdminDataSource(this.paginator, this.sort);

    this.projectsSubscription = this.projectService.projectsSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.projectKeys = Object.keys(this.projects);
      }
    );
    this.projectService.emitProjects();
    this._adapter.setLocale('fro');
  }
/*   ngAfterViewInit() {
    //this.dataSource = new MyAdminDataSource(this.paginator, this.sort);
  } */
}
