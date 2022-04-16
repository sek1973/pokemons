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
    { name: 'name', header: 'Name' },
    { name: 'url', header: 'Url' }
  ]
  activeRow?: RowItem;

  get isAciveRowPresent(): boolean {
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

  private showDetails(row?: RowItem): void {
    if (row && row.url) {
      const segments: string[] = (row.url as string).split('/');
      const id = segments[segments.length - 2];
      this.router.navigateByUrl(`pokemon/${id}`);
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
