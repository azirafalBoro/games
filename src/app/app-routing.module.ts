import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamesComponent} from './components/games/games.component';
import {GamePlayWindowComponent} from './components/game-play-window/game-play-window.component';

const routes: Routes = [
  { path: '',
    component: GamesComponent,
  },
  { path: 'game',
    component: GamePlayWindowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
