import { Component, OnInit } from '@angular/core';
import {GameApiService} from '../../services/game-api.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {
  loading: boolean | undefined;
  constructor(private gameApiService: GameApiService) {
  }

  ngOnInit(): void {
    this.gameApiService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

}
