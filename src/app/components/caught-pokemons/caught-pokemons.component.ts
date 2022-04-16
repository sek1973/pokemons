import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from 'projects/common/src/lib/components/table';
import { RowItem } from 'src/app/model/row-item.model';
import { CaughtPokemonsService } from 'src/app/services/caught-pokemons.service';

@Component({
  selector: 'app-caught-pokemons',
  templateUrl: './caught-pokemons.component.html',
  styleUrls: ['./caught-pokemons.component.scss']
})
export class CaughtPokemonsComponent {

  data: any[] = [];
  columnsDefinition: TableColumn[] = [
    { name: 'url', header: 'Url' },
    { name: 'name', header: 'Name' }
  ]
  activeRow?: RowItem;

  get isAciveRowPresent(): boolean {
    return this.activeRow ? true : false;
  }

  constructor(private dataService: CaughtPokemonsService,
    private router: Router) {
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
      this.onRefresh();
    }
  }

}
