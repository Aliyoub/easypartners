import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  editorForm: FormGroup;
  editorStyle = {
    border: '1px solid #eee',
    margin: '5px'
  };
  config = {
    toolbar: ['bold', 'underline']
  };

  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

  saveProjects(){
    firebase.database().ref('/Projects').push(this.editorForm.get('editor').value);
  }

  onSubmit(){
    console.log(this.editorForm.get('editor').value);
    this.saveProjects();
    //this.editorForm.enable();
    //this.editorForm.disable();
  }

}
