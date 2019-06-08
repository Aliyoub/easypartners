import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { MessageService } from '../services/message.service';
import { Project } from '../project.model';
import { Message } from '../message.model';
import { empty } from 'rxjs';
import { EmptyExpr } from '@angular/compiler';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  editorForm: FormGroup;
  project: Project;

messages: Message[];
errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.project = new Project('', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.projectService.getSingleProject(id).then(
      (project: Project) => {
        this.project = project;
        console.log(this.project);
      }
    );
    this.initForm();
  }

  onBack() {
    this.router.navigate(['/projects']);
  }

  initForm() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });

    this.editorForm = this.formBuilder.group({
      editor: ['', [Validators.required,]],
        //editor: ['', [Validators.pattern('[a-zA-Z0-9 ]*')]],
                      //[Validators.minLength(10)],
                      //[Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    const id = this.route.snapshot.params['id'];
    const messageContent = this.editorForm.get('editor').value;

    if (
      //For checking if the string is blank
      this.editorForm.get('editor').errors ||
      //For checking if the string contains only white-space
      !messageContent.trim()){
      this.errorMessage = 'a content is required';
      console.log('contenu vide!!! ' + messageContent.length);
      return;
    }
    /* if (this.editorForm.get('editor').errors){
      console.log(this.editorForm.get('editor').errors);
    //if (this.editorForm.get('editor').invalid || (messageContent.trim() === null)){
      this.errorMessage = 'a content is required'; //Object.values(this.editorForm.get('editor').errors);
      return;
    } */
    //this.messages = [messageContent];
    //this.messageService.createNewMessage(this.messages, id);
    //this.onBack();
  }

  /* onSubmit() {
    const id = this.route.snapshot.params['id'];
    const messageContent = this.editorForm.get('editor').value;
    this.messages = [messageContent];
    this.messageService.createNewMessage(this.messages, id).then(
      () => {
        console.log('chargement...');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
   }*/
}

