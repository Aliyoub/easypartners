import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../project.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  editorForm: FormGroup;
  /* editorOptions = {
    placeholder: 'Veuillez entrer le contenu de votre annonce'
  }; */
  placeholder = 'Votre contenu';
  editorStyle = {
    border: '1px solid #eee',
    margin: '5px'
  };

  config = {
    toolbar: ['bold', 'underline']

  };
  projects: Project[];
  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });

    this.editorForm = this.formBuilder.group({
    country: ['', [Validators.required]],
    category: ['', [Validators.required]],
    editor: ['', [Validators.required]],
    });
  }

  onSubmit(){
    const date = (new Date()).toLocaleDateString();
    const country = this.editorForm.get('country').value;
    const category = this.editorForm.get('category').value;
    const projectContent = this.editorForm.get('editor').value;
    this.projects = [date, country, category, projectContent];
    //this.projects.push(date, country, category, projectContent);

    console.log(this.projects);
    this.projectService.createNewProject(this.projects);
     /* .then({
      () => { */
        this.router.navigate(['/projects']);
      /* }
    }) */
    //this.saveProjects();
    //this.editorForm.enable();
    //this.editorForm.disable();
  }

}
