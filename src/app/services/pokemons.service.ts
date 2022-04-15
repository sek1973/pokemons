import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

export interface CollectionResponse<T> {
  conunt?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private httpClient: HttpClient) { }

  fetchData<T>(): Observable<CollectionResponse<T>> {
    return this.httpClient.get<CollectionResponse<T>>('/api/pokemon')
      .pipe(catchError(err => {
        console.error('Error catching data:', err);
        return of({ count: 0, next: null, previous: null, results: [] });
      }))
  }

}
