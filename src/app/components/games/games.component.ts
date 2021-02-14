import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameApiService} from '../../services/game-api.service';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnChanges {
  @Input() slug: string | undefined;
  @Input() searchGame: string | undefined;
  games$: Observable<any> | undefined;
  breakpoint = 8;
  constructor(private gamesApi: GameApiService) { }

  ngOnInit(): void {
    this.setColumnInGrid(window.innerWidth);
  }

  ngOnChanges(): void {
    console.log('ngOnChanges GamesComponent');
    if (this.slug) {
      console.log('ngOnChanges GamesComponent', this.slug);
      this.games$ = this.gamesApi.getGamesBySlug(this.slug).pipe(
        map(listOfGames => {
          if (this.searchGame) {
            return listOfGames._embedded.games.filter((game: any) => game.name.includes(this.searchGame));
          }

          return listOfGames._embedded.games;
        }),
        catchError(() => []));
    } else {
      this.games$ = this.gamesApi.getGames().pipe(
        map(listOfGames => {
          if (this.searchGame) {
            return listOfGames._embedded.games.filter((game: any) => game.name.includes(this.searchGame));
          }

          return listOfGames._embedded.games;
        }),
        catchError(() => [])
      );
    }
  }

  onResize(event: any): void {
    this.setColumnInGrid(event.target.innerWidth);
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
}
