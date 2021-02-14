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
  // isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private gamesApi: GameApiService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 12;

    document.addEventListener('DOMContentLoaded', () => {
      const lazyloadImages = document.querySelectorAll('img.lazy');
      let lazyloadThrottleTimeout: any;

      function lazyload(): void {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(() => {
          const scrollTop = window.pageYOffset;
          lazyloadImages.forEach((img: any) => {
            if (img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          });
          if (lazyloadImages.length === 0) {
            document.removeEventListener('scroll', lazyload);
            window.removeEventListener('resize', lazyload);
            window.removeEventListener('orientationChange', lazyload);
          }
        }, 20);
      }

      document.addEventListener('scroll', lazyload);
      window.addEventListener('resize', lazyload);
      window.addEventListener('orientationChange', lazyload);
    });
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
    console.log('test', event.target.innerWidth);
    let columns = 8;
    if (event.target.innerWidth <= 600) {
      columns = 2;
    } else if (event.target.innerWidth <= 1200) {
      columns = 4;
    } else if (event.target.innerWidth <= 1600) {
      columns = 6;
    }

    this.breakpoint = columns;
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
