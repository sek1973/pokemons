import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { PokemonsComponent } from './pokemons.component';

class RouterMock {
  navigateByUrl(url: string) { };
}
class PokemonServiceMock {
  fetchAll() {
    return of([]);
  }
}

class MatSnackBarMock {
  open() { }
}


describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: PokemonsService, useClass: PokemonServiceMock },
        { provide: MatSnackBar, useClass: MatSnackBarMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
