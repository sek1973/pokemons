import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { take } from 'rxjs';
import { RowItem } from 'src/app/model/row-item.model';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {

  data: any[] = [];
  columnsDefinition: TableColumn[] = [
    { name: 'url', header: 'Url' },
    { name: 'name', header: 'Name' }
  ]
  activeRow?: RowItem;
  loading: boolean = false;

  get isAciveRowPresent(): boolean {
    return this.activeRow ? true : false;
  }

  constructor(private dataService: PokemonsService,
    private router: Router) {
    this.onRefresh();
  }

  onRefresh(): void {
    this.loading = true;
    this.dataService.fetchAll<{ name: string, url: string }>()
      .pipe(take(1))
      .subscribe(results => {
        this.data = this.mapData(results);
        this.loading = false;
      });
    this.activeRow = undefined;
  }

  private mapData(data?: RowItem[]): RowItem[] {
    if (!data?.length) {
      return [];
    }
    const result: RowItem[] = data.map(
      item => {
        const segments: string[] = (item.url as string).split('/');
        const id = +segments[segments.length - 2];
        item.id = id;
        return item;
      }
    )
    return result;
  }

  onDoubleClick(row: RowItem): void {
    this.showDetails(row);
  }

  onRowActivated(row: RowItem): void {
    this.activeRow = row;
  }

  private showDetails(row?: RowItem): void {
    if (row && row.id) {
      this.router.navigateByUrl(`pokemon/${row.id}`);
    }
  }

  onShowDetails(): void {
    this.showDetails(this.activeRow);
  }

  addToCaught(): void {
    if (this.activeRow) {
      this.dataService.addToCaught(this.activeRow);
    }
  }

  addToWishList(): void {
    if (this.activeRow) {
      this.dataService.addToWishlist(this.activeRow);
    }
  }

}
