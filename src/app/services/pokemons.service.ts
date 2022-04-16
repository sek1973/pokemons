import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, expand, Observable, of, reduce } from 'rxjs';
import { RowItem } from '../model/row-item.model';
import { CaughtPokemonsService } from './caught-pokemons.service';
import { WishlistPokemonsService } from './wishlist-pokemons.service';

export interface CollectionResponse<T> {
  conunt?: number;
  next?: string | null;
  previous?: string | null;
  results: T[]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private httpClient: HttpClient,
    private caughtPokemonsService: CaughtPokemonsService,
    private wishlistPokemonsService: WishlistPokemonsService
  ) { }

  fetchData<T>(next?: string): Observable<CollectionResponse<T>> {
    return this.httpClient.get<CollectionResponse<T>>(next ?? '/api/pokemon')
      .pipe(
        catchError(err => {
          console.error('Error catching data:', err);
          return of({ count: 0, next: null, previous: null, results: [] });
        }))
  }

  fetchAll<T>(): Observable<T[]> {
    return this.fetchData<T>().pipe(
      expand(resp => resp.next ? this.fetchData<T>(resp.next) : EMPTY),
      reduce((acc: T[], value: CollectionResponse<T>) => acc.concat(value.results), []))
  }

  addToCaught(item: RowItem): void {
    this.caughtPokemonsService.addItem(item);
  }

  addToWishlist(item: RowItem): void {
    this.wishlistPokemonsService.addItem(item);
  }

}
