import { Component, OnInit } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  project: Project[] = [
    {
      id: 1,
      date: '07/02/2017',
      country: 'Tunisie',
      category: 'Santé'
    },
    {
      id: 2,
      date: '07/02/2018',
      country: 'Espagne',
      category: 'Agriculture'
    },
    {
      id: 3,
      date: '07/02/2015',
      country: 'France',
      category: 'Restauration'
    },
    {
      id: 4,
      date: '07/02/2013',
      country: 'France',
      category: 'Immobilier'
    },
    {
      id: 5,
      date: '07/02/2013',
      country: 'Italie',
      category: 'Mode'
    },
  ];
  constructor() {
  }

  ngOnInit() {//console.log(this.myVar);
  }

}
