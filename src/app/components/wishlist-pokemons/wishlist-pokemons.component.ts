import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { RowItem } from 'src/app/model/row-item.model';
import { WishlistPokemonsService } from 'src/app/services/wishlist-pokemons.service';

@Component({
  selector: 'app-wishlist-pokemons',
  templateUrl: './wishlist-pokemons.component.html',
  styleUrls: ['./wishlist-pokemons.component.scss']
})
export class WishlistPokemonsComponent {

  data: any[] = [];
  columnsDefinition: TableColumn[] = [
    { name: 'url', header: 'Url' },
    { name: 'name', header: 'Name' }
  ]
  activeRow?: RowItem;

  get isAciveRowPresent(): boolean {
    return this.activeRow ? true : false;
  }

  constructor(private dataService: WishlistPokemonsService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.onRefresh();
  }

  onRefresh(): void {
    this.data = this.dataService.getData();
    this.activeRow = undefined;
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

  remove(): void {
    if (this.activeRow) {
      this.dataService.removeItem(this.activeRow);
      this.snackBar.open(`Pokemon ${this.activeRow.name} removed from wish list`, 'Hide', { duration: 3000 });
      this.onRefresh();
    }
  }

}
