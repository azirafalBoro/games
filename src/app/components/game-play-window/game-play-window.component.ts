import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
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
    console.log('GamePlayWindowComponent ngOnInit BEFORE', this.game);
    this.paramsSubscriptions = this.chosenGame.getMessage().subscribe(
      (message: any) => {
        if (message) {
          this.game = message;
        }
      });
    console.log('GamePlayWindowComponent ngOnInit AFTER', this.game);
  }

  ngOnDestroy(): void {
    // this.paramsSubscriptions.next();
    // this.paramsSubscriptions.unsubscribe();
  }

}
