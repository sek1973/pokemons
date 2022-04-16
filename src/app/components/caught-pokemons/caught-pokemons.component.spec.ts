import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CaughtPokemonsComponent } from './caught-pokemons.component';

class RouterMock {
  navigateByUrl(url: string) { };
}

describe('CaughtPokemonsComponent', () => {
  let component: CaughtPokemonsComponent;
  let fixture: ComponentFixture<CaughtPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaughtPokemonsComponent],
      providers: [{ provide: Router, useClass: RouterMock }]
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
