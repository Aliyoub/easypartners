import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Project } from '../project.model';

// TODO: Replace this with your own data model type
/* export interface MyAdminItem {
  name: string;
  id: number;
} */


// TODO: replace this with real data from your application
/* const EXAMPLE_DATA: MyAdminItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
]; */


/**
 * Data source for the MyAdmin view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyAdminDataSource extends DataSource<Project> {
//export class MyAdminDataSource extends DataSource<MyAdminItem> {
  projects: Project[] = [];
  projectsSubject = new Subject<Project[]>();

  emitProjects() {
    this.projectsSubject.next(this.projects);
  }

  getProjects() {
    firebase.database().ref('/projects')
      .on('value', data => {
        this.projects = data.val() ? data.val() : [];
        this.emitProjects();
      }
      );
  }

 // data: MyAdminItem[] = EXAMPLE_DATA;
  data: Project[] = this.projects;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.getProjects() ;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Project[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Project[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Project[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        /* case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc); */
        case 'date': return compare(a.date, b.date, isAsc);
        case 'country': return compare(+a.country, +b.country, isAsc);
        case 'category': return compare(a.category, b.category, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
