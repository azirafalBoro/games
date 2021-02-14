import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, finalize, share, shareReplay, tap} from 'rxjs/operators';
import {error} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private lastCorrectCategory: string | undefined;
  private cache: any;
  private cachedObservable: Observable<any> | undefined;
  private cacheSlug: any;
  private cachedObservableSlug: Observable<any> | undefined;
  // starburst-old
// /game-categories[/<slug>]
  baseUrl = 'https://staging-frontapi.cherrytech.com/';
  baseParameters = '?brand=cherrycasino.desktop&locale=en';
  private cpt = 1;
  public isLoading = new BehaviorSubject(false);

  // games?brand=cherrycasino.desktop&locale=en

  constructor(private http: HttpClient) {}

  // getGames(): Observable<any> {
  //   console.log(`Calling the service for the ${this.cpt++} time`);
  //   return this.http.get<any>(this.baseUrl + 'games' + this.baseParameters).pipe(
  //     shareReplay(),
  //     catchError(this.handleError));
  // }



// ...

  getGames(): Observable<any> {
    let observable: Observable<any>;
    console.log('begin begin begin begin begin begin begin begin begin begin ');
    console.log('this.cache', this.cache);
    console.log('this.cachedObservable', this.cachedObservable);
    if (this.cache) {
      console.log('I');
      observable = of(this.cache);
    }  else if (this.cachedObservable) {
      console.log('II');
      observable = this.cachedObservable;
    } else {
      console.log('III');
      this.cachedObservable = this.http.get<any>(this.baseUrl + 'games' + this.baseParameters)
        .pipe(
          tap(res => this.cache = res),
          share(),
          finalize(() => this.cachedObservable = undefined)
        );
      observable = this.cachedObservable;
    }
    console.log('this.cache', this.cache);
    console.log('this.cachedObservable', this.cachedObservable);
    console.log('end end end end end end end end end end end end end end end end ');
    return observable;
  }

  // getUserId(id: string): Observable<User> {
  //   return this.http.get<User>(this.baseUrl + '/' + id);
  // }
  //
  // getGamseBySlug(slug: string): Observable<any> {
  //   console.log(`Calling the service for the ${this.cpt++} time`);
  //   return this.http.get<any>(this.baseUrl + 'game-categories/' + slug + this.baseParameters).pipe(
  //     shareReplay(),
  //     catchError(this.handleError));
  // }

  getGamesBySlug(slug: string): Observable<any> {
    let observable: Observable<any>;
    console.log('begin begin begin begin begin begin begin begin begin begin ');
    console.log('slug', slug);
    console.log('this.lastCorrectCategory', this.lastCorrectCategory);
    console.log('this.cacheSlug', this.cacheSlug);
    console.log('this.cachedObservableSlug', this.cachedObservableSlug);
    if (this.cacheSlug && this.lastCorrectCategory === slug) {
      console.log('A');
      observable = of(this.cacheSlug);
    }  else if (this.cachedObservableSlug) {
      console.log('B');
      observable = this.cachedObservableSlug;
    } else {
      console.log('C');
      this.cachedObservableSlug = this.http.get<any>(this.baseUrl + 'game-categories/' + slug + this.baseParameters)
        .pipe(
          tap(res => this.cacheSlug = res),
          share(),
          finalize(() => {
            this.cachedObservableSlug = undefined;
            this.lastCorrectCategory = slug;
          })
        );
      observable = this.cachedObservableSlug;
    }
    console.log('this.lastCorrectCategory', this.lastCorrectCategory);
    console.log('this.cacheSlug', this.cacheSlug);
    console.log('this.cachedObservableSlug', this.cachedObservableSlug);
    console.log('end end end end end end end end end end end end end end end end ');
    return observable;
  }

  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   if (err.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', err.error.message);
  //   } else {
  //     console.error(
  //       'Backend returned code ${error.status}, ' +
  //       'body was: ${error.error}');
  //   }
  //
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
