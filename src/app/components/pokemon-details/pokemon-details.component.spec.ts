import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonDetailsService } from 'src/app/services/pokemon-details.service';
import { PokemonDetailsComponent } from './pokemon-details.component';


class ActivateRouteMock {
  snapshot = {
    params: { id: 0 }
  }
}

class PokemonDetailsServiceMock {
  fetchData(id: number) { return of({}); }
}

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivateRouteMock },
        { provide: PokemonDetailsService, useClass: PokemonDetailsServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
