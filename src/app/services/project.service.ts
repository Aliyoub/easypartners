import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject  } from 'rxjs';
import { Project } from '../project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];
  projectsSubject = new Subject<Project[]>();

  emitProjects() {
    this.projectsSubject.next(this.projects);
  }
  constructor() { this.getProjects(); }

  getProjects(){
    firebase.database().ref('/Projects')
      .on('value', data => {
        this.projects = data.val() ? data.val() : [];
        this.emitProjects();
      }
      );
  }

}
