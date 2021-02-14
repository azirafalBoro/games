import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ChosenGameService} from '../../services/chosen-game.service';

@Component({
  selector: 'app-game-play-window',
  templateUrl: './game-play-window.component.html',
  styleUrls: ['./game-play-window.component.scss']
})
export class GamePlayWindowComponent implements OnInit, OnDestroy {
  game: any;
  paramsSubscriptions: Subscription | undefined;
  constructor(private route: ActivatedRoute, private chosenGame: ChosenGameService) {
  }

  ngOnInit(): void {
    this.game = this.chosenGame.getChosenGameName();
    this.paramsSubscriptions = this.chosenGame.getChosenGame().subscribe(
      (message: any) => {
        if (message) {
          this.game = message;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscriptions) { this.paramsSubscriptions.unsubscribe(); }
  }

}
