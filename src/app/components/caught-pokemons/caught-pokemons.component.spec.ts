import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtPokemonsComponent } from './caught-pokemons.component';

describe('CaughtPokemonsComponent', () => {
  let component: CaughtPokemonsComponent;
  let fixture: ComponentFixture<CaughtPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaughtPokemonsComponent ]
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
