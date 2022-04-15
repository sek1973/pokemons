import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  data: any[] = [];
  columnDefinition: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'url', header: 'Url' }
  ]

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<{ conunt?: number, next?: string, previous?: string, results?: any[] }>('/api/pokemon')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => this.data = data.results ?? []);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
