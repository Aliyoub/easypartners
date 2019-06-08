import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUrl: string;
  constructor(private router: Router, private location: Location ) {
    const config = {
      apiKey: 'AIzaSyB0g4s9992Sl0U3YWm6hPlZ17qe-QND0Sg',
      authDomain: 'easy-partnership-2675.firebaseapp.com',
      databaseURL: 'https://easy-partnership-2675.firebaseio.com',
      projectId: 'easy-partnership-2675',
      storageBucket: 'easy-partnership-2675.appspot.com',
      messagingSenderId: '912086837318'
    };
    firebase.initializeApp(config);

    // On recupere le uri dans l'intention de ne pas afficher le contenu de jumbotron lorsqu'on est sur '/operation'
    this.router.events.subscribe(() => {
        this.currentUrl = location.path();
      //console.log(this.currentUrl);
    });
  }


}
