import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {finalize, share, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private lastCorrectCategory: string | undefined;
  private cache: any;
  private cachedObservable: Observable<any> | undefined;
  private cacheSlug: any;
  private cachedObservableSlug: Observable<any> | undefined;
  baseUrl = 'https://staging-frontapi.cherrytech.com/';
  baseParameters = '?brand=cherrycasino.desktop&locale=en';
  public isLoading = new BehaviorSubject(false);


  constructor(private http: HttpClient) {}

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

  getGamesBySlug(slug: string): Observable<any> {
    let observable: Observable<any>;
    if (this.cacheSlug && this.lastCorrectCategory === slug) {
      observable = of(this.cacheSlug);
    }  else if (this.cachedObservableSlug) {
      observable = this.cachedObservableSlug;
    } else {
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
    return observable;
  }
}
