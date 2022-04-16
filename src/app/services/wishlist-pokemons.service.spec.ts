import { TestBed } from '@angular/core/testing';

import { WishlistPokemonsService } from './wishlist-pokemons.service';

describe('WishlistPokemonsService', () => {
  let service: WishlistPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
