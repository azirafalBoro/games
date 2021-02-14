import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayWindowComponent } from './game-play-window.component';

describe('GamePlayWindowComponent', () => {
  let component: GamePlayWindowComponent;
  let fixture: ComponentFixture<GamePlayWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePlayWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
