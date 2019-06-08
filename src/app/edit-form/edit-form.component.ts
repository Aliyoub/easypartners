import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../project.model';
//import { Category } from '../category.model';

import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}
export interface Category {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};



@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  editorForm: FormGroup;
  projects: Project[];


  categories: Category[] = [{
    letter: 'A',
    names: ['Automobile', 'Agriculture']
  }, {
    letter: 'C',
    names: ['Construction']
  }
  ];

   stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  }, {
    letter: 'D',
    names: ['Delaware']
  }, {
    letter: 'F',
    names: ['Florida']
  }, {
    letter: 'G',
    names: ['Georgia']
  }, {
    letter: 'H',
    names: ['Hawaii']
  }, {
    letter: 'I',
    names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
  }, {
    letter: 'K',
    names: ['Kansas', 'Kentucky']
  }, {
    letter: 'L',
    names: ['Louisiana']
  }, {
    letter: 'M',
    names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
      'Minnesota', 'Mississippi', 'Missouri', 'Montana']
  }, {
    letter: 'N',
    names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota']
  }, {
    letter: 'O',
    names: ['Ohio', 'Oklahoma', 'Oregon']
  }, {
    letter: 'P',
    names: ['Pennsylvania']
  }, {
    letter: 'R',
    names: ['Rhode Island']
  }, {
    letter: 'S',
    names: ['South Carolina', 'South Dakota']
  }, {
    letter: 'T',
    names: ['Tennessee', 'Texas']
  }, {
    letter: 'U',
    names: ['Utah']
  }, {
    letter: 'V',
    names: ['Vermont', 'Virginia']
  }, {
    letter: 'W',
    names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  }];

  stateGroupOptions: Observable<StateGroup[]>;
  categoryGroupOptions: Observable<Category[]>;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router) { }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }
    return this.stateGroups;
  }
  private _filterCategory(value: string): Category[] {
    if (value) {
      return this.categories
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }
    return this.categories;
  }

  ngOnInit() {
    this.initForm();

    this.stateGroupOptions = this.editorForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.categoryGroupOptions = this.editorForm.get('category')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCategory(value))
      );

  }

  initForm(){
    /* this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    }); */

    this.editorForm = this.formBuilder.group({
    country: ['', [Validators.required]],
    category: ['', [Validators.required]],
    editor: ['', [Validators.required]],
    stateGroup: ['', [Validators.required]]
    });

  }

  onSubmit(){
    const date = (new Date()).toLocaleDateString();
    /* const country = this.editorForm.get('country').value; */
    const category = this.editorForm.get('category').value;
    const projectContent = this.editorForm.get('editor').value;
    const country = this.editorForm.get('stateGroup').value;
    console.log(country);
    this.projects = [date, country, category, projectContent];
    //this.projects.push(date, country, category, projectContent);

    //console.log(this.projects);
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
