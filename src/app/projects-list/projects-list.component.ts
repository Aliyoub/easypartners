import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectKeys: string[];
  projectsSubscription: Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectsSubscription = this.projectService.projectsSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.projectKeys = Object.keys(this.projects);
        console.log(this.projects);
      }
    );
    this.projectService.emitProjects();
  }
  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
/* export class ProjectsListComponent implements OnInit {
  projects: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  project: Project[] = [
      {
        id: 4,
        date: '07/03/2019',
        country: 'France',
        category: 'Immobilier',
        project_content: 'Nous sommes un groupe de personnes en France dont le but est de concrétiser les réalisations de la diaspora. Nous commenceront cette activité en Côte d\'Ivoire où nous avons déjà entrepris les démarches administratives entre autres. En effet, nombreux sont les cas de tentatives de construction de logement ou d\'achat de maison qui se sont soldés par un échec, et ce, à cause de la malhonnêteté de nos proches. Nous proposons donc nos services à toute personne intéressée par notre activité. Tous les détails vous seront présentés lors d\'une éventuelle mise en relation'
      },
    {
      id: 1,
      date: '07/02/2019',
      country: 'Tunisie',
      category: 'Santé',
      project_content: 'Nous sommes un centre médical à la recherche de matériels médicaux. Toute proposition serait la bienvenue.'
    },
    {
      id: 2,
      date: '07/02/2019',
      country: 'Espagne',
      category: 'Agriculture',
      project_content: 'Nous sommes un grand producteur d\'oranges à la recherche d\'un representant en France. Ce dernier aura la responsabilité de trouver des acheteurs '
    },
    {
      id: 3,
      date: '07/02/2019',
      country: 'France',
      category: 'Restauration',
      project_content: 'Nous recherchons un partenaire pour la distribution d\'une nouvelle gamme de boisson non alcoolisée'
    },
    {
      id: 5,
      date: '07/02/2019',
      country: 'Madagascar',
      category: 'Agriculture',
      project_content: 'Recherche partenaires pour projet à Madagascar. Notre jeune association humanitaire franco-suisse, dont le but est axé sur les aides aux enfants et familles du sud-est de Madagascar, souhaiterait trouver en Suisse et en France, des partenaires pour le développement d\'un projet de création d\'un centre d\'aide par le travail, dans le domaine de l\'agro-alimentaire.'
    },
    {
      id: 6,
      date: '07/02/2019',
      country: 'Côte d\'Ivoire',
      category: 'Mode',
      project_content: 'Passionnée de la couture et de la mode, et ayant suivi une formation de couture, je suis à la recherche d\'une âme charitable. En effet, je suis à la recherche de toute personne prête à me mettre à disposition le matériel de travail afin que je puisse enfin me prendre en charge.'
    },
  ];
  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void{
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  } */



}
