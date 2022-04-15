import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private dataService: PokemonsService,
    private router: Router) {
    this.onRefresh();
  }

  ngOnDestroy(): void {

  }

  onRefresh(): void {
    this.dataService.fetchData<{ name: string, url: string }>()
      .pipe(take(1))
      .subscribe(data => this.data = data.results ?? []);
  }

  onDoubleClick(event: any): void {
    if (event && event.url) {
      const segments: string[] = (event.url as string).split('/');
      const id = segments[segments.length - 2];
      this.router.navigateByUrl(`pokemon/${id}`);
    }
  }

}
