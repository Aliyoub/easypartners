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
      /* *** */
    };
    firebase.initializeApp(config);

    // On recupere le uri dans l'intention de ne pas afficher le contenu de jumbotron lorsqu'on est sur '/operation'
    this.router.events.subscribe(() => {
        this.currentUrl = location.path();
      //console.log(this.currentUrl);
    });
  }


}
