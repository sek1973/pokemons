import { Injectable } from '@angular/core';
import { RowItem } from '../model/row-item.model';
import { getLocalStorageItem, setLocalStorageItem } from '../tools/local-storage';

const caughtPokemonsKey = 'caught.pokemons';

@Injectable({
  providedIn: 'root'
})
export class CaughtPokemonsService {

  private items: Map<string, RowItem> = new Map<string, RowItem>();

  constructor() { }

  getData(): RowItem[] {
    const items = getLocalStorageItem<RowItem[]>(caughtPokemonsKey) ?? [];
    this.items.clear();
    items.forEach(i => this.items.set(i.url, i));
    return Array.from(this.items, ([key, value]) => ({ ...value }));
  }

  saveData(items: RowItem[]): void {
    this.items.clear();
    items.forEach(i => this.items.set(i.url, i));
    this._saveData();
  }

  private _saveData(): void {
    setLocalStorageItem<RowItem[]>(caughtPokemonsKey, Array.from(this.items, ([key, value]) => ({ ...value })));
  }

  addItem(item: RowItem): void {
    this.items.set(item.url, item);
    this._saveData();
  }

  removeItem(item: RowItem): void {
    this.items.delete(item.url);
    this._saveData();
  }
}
