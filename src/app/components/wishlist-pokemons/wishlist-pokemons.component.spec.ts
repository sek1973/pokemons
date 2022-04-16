import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistPokemonsComponent } from './wishlist-pokemons.component';

describe('WishlistPokemonsComponent', () => {
  let component: WishlistPokemonsComponent;
  let fixture: ComponentFixture<WishlistPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistPokemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
