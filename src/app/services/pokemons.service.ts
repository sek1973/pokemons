import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CollectionResponse<T> {
  conunt?: number;
  next?: string;
  previous?: string;
  results?: T[]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private httpClient: HttpClient) { }

  fetchData<T>(): Observable<CollectionResponse<T>> {
    return this.httpClient.get<CollectionResponse<T>>('/api/pokemon')
  }

}
