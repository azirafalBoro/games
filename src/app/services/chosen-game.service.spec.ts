import { TestBed } from '@angular/core/testing';

import { ChosenGameService } from './chosen-game.service';

describe('ChosenGameService', () => {
  let service: ChosenGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
