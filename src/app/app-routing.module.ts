import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamesComponent} from './components/games/games.component';
import {GamesDashboardComponent} from './components/games-dashboard/games-dashboard.component';

const routes: Routes = [
  { path: '',
    component: GamesDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
