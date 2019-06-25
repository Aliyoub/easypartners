// help : https://blog.angular-university.io/angular-material-dialog/
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../project.model';
import { ProjectService } from '../../services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  date: string;
  country: string;
  category: String;
  projectContent: string;
  key: any;
  form: FormGroup;
  projects: Project[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private projectService: ProjectService) {
    this.date = data.date;
    this.country = data.country;
    this.category = data.category;
    this.projectContent = data.projectContent;
    this.key = data.key;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      date: [this.date, [Validators.required]],
      country: [this.country, [Validators.required]],
      category: [this.category, [Validators.required]],
      projectContent: [this.projectContent, [Validators.required]],
    });

  }

  onSave(key) {
    // Pour avoir le format voulu de la date
    const getDate = new Date(this.form.get('date').value).getDate();
    const getMonth = new Date(this.form.get('date').value).getMonth() + 1; // + 1 car janvier correspond à 0
    const getFullYear = new Date(this.form.get('date').value).getFullYear();


    const date = getDate + '/' + getMonth + '/' + getFullYear;
    const country = this.form.get('country').value;
    const category = this.form.get('category').value;
    const projectContent = this.form.get('projectContent').value;

    return this.dialogRef.close(this.projectService.updateProject(key,
      {
        date: date,
        country: country,
        category: category,
        projectContent: projectContent
      }));

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
