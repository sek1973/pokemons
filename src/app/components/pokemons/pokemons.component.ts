import { Component, OnDestroy } from '@angular/core';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { take } from 'rxjs';
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

  constructor(private dataService: PokemonsService) {
    this.onRefresh();
  }

  ngOnDestroy(): void {

  }

  onRefresh(): void {
    this.dataService.fetchData<{ name: string, url: string }>()
      .pipe(take(1))
      .subscribe(data => this.data = data.results ?? []);
  }

}
