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

  constructor() { this.getProjects() }
  getProjects(){
    firebase.database().ref('/projects')
      .on('value', data => {
        this.projects = data.val() ? data.val() : [];
        this.emitProjects();
      }
      );
  }

  getSingleProject(id: any) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/projects/' + id)
        .once('value').then(
          data => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  deleteProject(id: any) {
    firebase.database().ref('projects/' + id).set(null);
  }
  updateProject(id: any, updates: any) {
    firebase.database().ref('projects/' + id).update(updates);
  }


  createNewProject(newProject: Project[]) {
    // je recupere les valeurs des éléments(input,..) dans un tableau
    this.projects = newProject;
    this.saveProjects();
    this.emitProjects();
  }


  saveProjects() {
    const userId = firebase.auth().currentUser.uid;
    //const newPostKey = firebase.database().ref().child('projects').push().key;

    // j'alimente la bd (firebase) avec ce tableau de valeurs recuperées
    //firebase.database().ref('/projects/').push(this.projects);
    firebase.database().ref().child('projects').push(
      {
        date: this.projects[0],
        country: this.projects[1],
        category: this.projects[2],
        projectContent: this.projects[3],
        uid: userId,
        messages: []
      }
      );
    }
}
