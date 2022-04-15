import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  constructor(private httpClient: HttpClient) { }

  fetchData<T>(id: number): Observable<Object> {
    return this.httpClient.get<Object>(`/api/pokemon/${id}`)
      .pipe(catchError(err => {
        console.error('Error catching data:', err);
        return of({});
      }))
  }

}
