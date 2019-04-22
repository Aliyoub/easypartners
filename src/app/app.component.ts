import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {}

  /* var config = {
    apiKey: 'AIzaSyDHQcl9eBkjc3l-cL29Z9fKINltrKYoTTI',
    authDomain: 'entrevoisins-1.firebaseapp.com',
    databaseURL: 'https://entrevoisins-1.firebaseio.com',
    projectId: 'entrevoisins-1',
    storageBucket: 'entrevoisins-1.appspot.com',
    messagingSenderId: '265098566437'
  };
  firebase.initializeApp(config);

} */
}
