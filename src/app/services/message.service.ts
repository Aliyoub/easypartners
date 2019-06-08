import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Message } from '../message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messagesSubject = new Subject<Message[]>();

  emitMessages() {
    this.messagesSubject.next(this.messages);
  }

  constructor() {}

  /* getSingleProject(id: any) {
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
  } */

  createNewMessage(newMessage: Message[], projectKey: any) {
    // je recupere les valeurs des éléments(input,..) dans un tableau
    this.messages = newMessage;
    this.saveMessages(projectKey);
    this.emitMessages();
  }

  saveMessages(projectKey: any) {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref().child('projects/' + projectKey + '/messages').push(
      {
        date: (new Date()).toLocaleDateString(),
        messageContent: this.messages[0],
        uid: userId
      }
    );
  }
}
