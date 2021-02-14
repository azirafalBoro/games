import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, finalize, share, shareReplay, tap} from 'rxjs/operators';
import {error} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
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
    if (this.cache) {
      observable = of(this.cache);
    }  else if (this.cachedObservable) {
      observable = this.cachedObservable;
    } else {
      this.cachedObservable = this.http.get<any>(this.baseUrl + 'games' + this.baseParameters)
        .pipe(
          tap(res => this.cache = res),
          share(),
          finalize(() => this.cachedObservable = undefined)
        );
      observable = this.cachedObservable;
    }
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
    if (this.cacheSlug) {
      observable = of(this.cacheSlug);
    }  else if (this.cachedObservableSlug) {
      observable = this.cachedObservableSlug;
    } else {
      this.cachedObservableSlug = this.http.get<any>(this.baseUrl + 'game-categories/' + slug + this.baseParameters)
        .pipe(
          tap(res => this.cacheSlug = res),
          share(),
          finalize(() => this.cachedObservableSlug = undefined)
        );
      observable = this.cachedObservableSlug;
    }
    return observable;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}