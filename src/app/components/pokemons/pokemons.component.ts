import { Component, OnDestroy } from '@angular/core';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { Subject, takeUntil } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnDestroy {

  data: any[] = [];
  columnDefinition: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'url', header: 'Url' }
  ]

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private dataService: PokemonsService) {
    this.dataService.fetchData<{ name: string, url: string }>()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => this.data = data.results ?? []);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
