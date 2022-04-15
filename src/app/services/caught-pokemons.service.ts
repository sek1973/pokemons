import { Injectable } from '@angular/core';
import { RowItem } from '../model/row-item.model';

const caughtPokemonsKey = 'caught.pokemons';

@Injectable({
  providedIn: 'root'
})
export class CaughtPokemonsService {

  private items: Map<string, string> = new Map<string, string>();

  constructor() { }

  getData(): RowItem[] {
    const items = getLocalStorageItem<RowItem[]>(caughtPokemonsKey) ?? [];
    items.forEach(i => this.items.set(i.url, i.name));
    return Array.from(this.items, ([name, url]) => ({ name, url }));
  }

  saveData(items: RowItem[]): void {
    this.items.clear();
    items.forEach(i => this.items.set(i.url, i.name));
    this._saveData();
  }

  private _saveData(): void {
    setLocalStorageItem<RowItem[]>(caughtPokemonsKey, Array.from(this.items, ([name, url]) => ({ name, url })));
  }

  addItem(item: RowItem): void {
    this.items.set(item.url, item.name);
  }

  removeItem(item: RowItem): void {
    this.items.delete(item.url);
  }
}
