import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChosenGameService {
  private subject = new Subject<any>();
  chosenGame: any;

  setChosenGame(game: any): void {
    this.chosenGame = game;
    this.subject.next(this.chosenGame);
  }

  getChosenGame(): Observable<any> {
    return this.subject.asObservable();
  }

  getChosenGameName(): any {
    return this.chosenGame;
  }
}
