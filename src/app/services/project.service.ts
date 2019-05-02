import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject  } from 'rxjs';
import { Project } from '../project.model';

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

  createNewProject(newProject: Project[]) {
    // je recupere les valeurs des éléments(input,..) dans un tableau
    this.projects = newProject;
    this.saveProjects();
    this.emitProjects();
  }

  saveProjects() {
    // j'alimente la bd (firebase) avec ce tableau de valeurs recuperées
    firebase.database().ref('/Projects').push(this.projects);
  }
}
