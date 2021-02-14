import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamesDashboardComponent } from './components/games-dashboard/games-dashboard.component';
import { GamesComponent } from './components/games/games.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptorService} from './interceptors/loader-interceptor.service';
import {MatButtonModule} from '@angular/material/button';
import {LazyDirective} from './directives/lazy.directive';
import { ImageErrorDirective } from './directives/image-error.directive';
import { GamePlayWindowComponent } from './components/game-play-window/game-play-window.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    GamesDashboardComponent,
    GamesComponent,
    LoaderSpinnerComponent,
    LazyDirective,
    ImageErrorDirective,
    GamePlayWindowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatBadgeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
