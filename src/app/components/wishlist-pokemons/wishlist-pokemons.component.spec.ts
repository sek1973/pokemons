import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WishlistPokemonsComponent } from './wishlist-pokemons.component';

class RouterMock {
  navigateByUrl(url: string) { };
}

class MatSnackBarMock {
  open() { }
}


describe('WishlistPokemonsComponent', () => {
  let component: WishlistPokemonsComponent;
  let fixture: ComponentFixture<WishlistPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishlistPokemonsComponent],
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: MatSnackBar, useClass: MatSnackBarMock }
      ]
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
