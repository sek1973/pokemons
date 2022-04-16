import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CaughtPokemonsComponent } from './caught-pokemons.component';

class RouterMock {
  navigateByUrl(url: string) { };
}

class MatSnackBarMock {
  open() { }
}

describe('CaughtPokemonsComponent', () => {
  let component: CaughtPokemonsComponent;
  let fixture: ComponentFixture<CaughtPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaughtPokemonsComponent],
      providers: [
        { provide: Router, useClass: RouterMock },
        { provide: MatSnackBar, useClass: MatSnackBarMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaughtPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
