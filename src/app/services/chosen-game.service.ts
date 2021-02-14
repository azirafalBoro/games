import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChosenGameService {
  private subject = new Subject<any>();
  chosenGame: any;

  setMessage(game: any): void {
    console.log('setMessage game', game);
    this.chosenGame = game;
    this.subject.next(this.chosenGame);
  }

  // sendMessage(message: string): void {
  //   this.subject.next({ text: message });
  // }
  //
  // clearMessages(): void {
  //   this.subject.next();
  // }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getChosenGameName(): any {
    return this.chosenGame;
  }
}
