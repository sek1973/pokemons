import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { take } from 'rxjs';
import { RowItem } from 'src/app/model/row-item.model';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-wishlist-pokemons',
  templateUrl: './wishlist-pokemons.component.html',
  styleUrls: ['./wishlist-pokemons.component.scss']
})
export class WishlistPokemonsComponent {

  data: any[] = [];
  columnsDefinition: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'url', header: 'Url' }
  ]
  activeRow?: RowItem;

  get canShowDetails(): boolean {
    return this.activeRow ? true : false;
  }

  constructor(private dataService: PokemonsService,
    private router: Router) {
    this.onRefresh();
  }

  onRefresh(): void {
    this.dataService.fetchAll<{ name: string, url: string }>()
      .pipe(take(1))
      .subscribe(results => this.data = results ?? []);
    this.activeRow = undefined;
  }

  onDoubleClick(row: RowItem): void {
    this.showDetails(row);
  }

  onRowActivated(row: RowItem): void {
    this.activeRow = row;
  }

  private showDetails(row: RowItem): void {
    if (row && row.url) {
      const segments: string[] = (row.url as string).split('/');
      const id = segments[segments.length - 2];
      this.router.navigateByUrl(`pokemon/${id}`);
    }
  }
}
