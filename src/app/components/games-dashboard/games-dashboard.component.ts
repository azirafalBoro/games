import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-games-dashboard',
  templateUrl: './games-dashboard.component.html',
  styleUrls: ['./games-dashboard.component.scss']
})
export class GamesDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('categories', {static: true}) categories: any;
  @ViewChild('name', {static: true}) inputGame: any;
  gameCategories = '';
  gameName = '';
  constructor() { }

  ngOnInit(): void {
    // fromEvent(this.categories.nativeElement, 'keyup')
    //   .pipe(
    //     filter(Boolean),
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //   )
    //   .subscribe(value => this.gameCategories = '' + value);
  }

  ngAfterViewInit(): void {
    // server-side search
    // fromEvent(this.categories.nativeElement, 'keyup')
    //   .pipe(
    //     filter(Boolean),
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //     tap(() => console.log(this.categories.nativeElement.value))
    //   )
    //   .subscribe();

    // fromEvent(this.inputGame.nativeElement, 'keyup')
    //   .pipe(
    //     filter(Boolean),
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     // tap(() => console.log(this.inputGame.nativeElement.value))
    //   )
    //   .subscribe();
  }

  // ngAfterViewInit(){
  //   this.input.valueChanges
  //     .pipe(debounceTime(500))
  //     .pipe(distinctUntilChanged())
  //     .subscribe(model => (value)=>{
  //       console.log('delayed key press value',value);
  //       this.rename(value);
  //     });
  // }
  //
  // rename(value): void {
  //   this.renameRequest.emit(value);
  // }
}