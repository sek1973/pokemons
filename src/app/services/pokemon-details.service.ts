import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'projects/common/src/lib/components/tree/tree.component';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  constructor(private httpClient: HttpClient) { }

  fetchData<T extends Object>(id: number): Observable<T | {}> {
    return this.httpClient.get<T>(`/api/pokemon/${id}`)
      .pipe(catchError(err => {
        console.error('Error catching data:', err);
        return of({});
      }));
  }

  fetchDataForTree<T extends Object>(id: number): Observable<TreeNode[]> {
    return this.fetchData<T>(id)
      .pipe(map(data => this.convertToTreeData(data)));
  }

  private convertToTreeData(data: any): TreeNode[] {
    if (data === null || data === undefined) { return []; }
    if (Array.isArray(data)) {
      const result: TreeNode[] = [];
      for (const [index, datum] of data.entries()) {
        result.push({ name: index.toString(), children: this.convertToTreeData(datum) });
      }
      return result;
    } else if (typeof data === 'object') {
      const keys = Object.keys(data);
      const result: TreeNode[] = [];
      for (const key of keys) {
        result.push({ name: key, children: this.convertToTreeData(data[key]) });
      }
      return result;
    } else {
      return [{ name: data.toString() }];
    }
  }

}
