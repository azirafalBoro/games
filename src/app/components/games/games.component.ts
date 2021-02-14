import {Component, OnChanges, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {GameApiService} from '../../services/game-api.service';
import {catchError, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {ChosenGameService} from '../../services/chosen-game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  gameCategories = '';
  gameName = '';
  modelChanged = new Subject();
  modelChangedName = new BehaviorSubject('');
  games$: Observable<any> | undefined;
  breakpoint = 8;
  constructor(private gamesApi: GameApiService, private chosenGame: ChosenGameService, private router: Router) { }

  ngOnInit(): void {
    this.setColumnInGrid(window.innerWidth);
    this.modelChanged
      .pipe(
        debounceTime(300))
      .subscribe(() => {
        console.log('getGamesBySlug request Slug Slug Slug Slug Slug Slug Slug Slug Slug Slug Slug');
        // debugger
        this.games$ = this.gamesApi.getGamesBySlug(this.gameCategories).pipe(
          map(listOfGames => {
            // debugger
            if (this.gameName) {
              return listOfGames._embedded.games.filter((game: any) => game.name.includes(this.gameName));
            }

            return listOfGames._embedded.games;
          }),
          catchError(() => []));
      });

    this.modelChangedName
      .pipe(
        debounceTime(300))
      .subscribe(() => {
        console.log('getGames request games games games games games games games games games games');
        this.games$ = this.gamesApi.getGames().pipe(
            map(listOfGames => {
              // debugger
              if (this.gameName) {
                return listOfGames._embedded.games.filter((game: any) => game.name.includes(this.gameName));
              }

              return listOfGames._embedded.games;
            }),
            catchError(() => [])
          );
      });
  }

  onResize(event: any): void {
    this.setColumnInGrid(event.target.innerWidth);
  }

  changedCategory(): void {
    this.modelChanged.next();
  }

  changedName(event: any): void {
    this.modelChangedName.next(event);
  }

  private setColumnInGrid(width: number): void {
    let columns = 8;
    if (width <= 600) {
      columns = 2;
    } else if (width <= 1200) {
      columns = 4;
    } else if (width <= 1600) {
      columns = 6;
    }

    this.breakpoint = columns;
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  goPlayGame(game: any): void {
    this.chosenGame.setMessage(game);
    this.router.navigate(['/game']);
  }
}
