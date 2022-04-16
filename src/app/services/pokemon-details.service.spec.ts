import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonDetailsService } from './pokemon-details.service';


class HttpClientMock {
  get() {
    return of({});
  }
}

describe('PokemonDetailsService', () => {
  let service: PokemonDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientMock }]
    });
    service = TestBed.inject(PokemonDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
