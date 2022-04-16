import { HttpClient } from '@angular/common/http';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonsService } from './pokemons.service';


class HttpClientMock {
  get() {
    return of({
      conunt: 100,
      next: '',
      previous: null,
      results: [
        { url: 'test1', name: 'test1' },
        { url: 'test2', name: 'test2' },
        { url: 'test3', name: 'test3' }
      ]
    });
  }
}

describe('PokemonsService', () => {
  let service: PokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientMock }]
    });
    service = TestBed.inject(PokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data'), fakeAsync(() => {
    let count: number | undefined;
    service.fetchAll().subscribe(val => count = val.length);
    flushMicrotasks();
    expect(count).toBe(3);
  });

});
