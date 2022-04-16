import { TestBed } from '@angular/core/testing';

import { CaughtPokemonsService } from './caught-pokemons.service';

describe('CaughtPokemonsService', () => {
  let service: CaughtPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaughtPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
