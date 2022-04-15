import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TableCellDirective } from './directives';
import { TableColumn } from './table-column.model';
import { TableDataSource } from './table-data-source';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TableComponent<T extends { [key: string]: any }> implements OnInit, AfterViewInit, OnDestroy {
  dataReady: boolean;
  expandedRow: any;
  activeRow: any;

  index = 0;
  private sort?: MatSort;
  private paginator?: MatPaginator;
  private _columnsDefinition: TableColumn[] = [];
  private _expandable: boolean = false;
  private subscription = Subscription.EMPTY;
  private loadingSubscription = Subscription.EMPTY;

  @Output() rowDblClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActivated: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowExpanded: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowCollapsed: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowSelectAll: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowUnselectAll: EventEmitter<any> = new EventEmitter<any>();
  @Output() detailsButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshButtonClicked: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(MatTable) table?: MatTable<any>;
  @ViewChild('table', { read: ElementRef }) tableElementRef?: ElementRef;

  @ViewChild(MatSort)
  set matSort(ms: MatSort) {
    if (this.sort !== ms) { this.sort = ms; }
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    if (this.paginator !== mp) {
      this.paginator = mp;
      this.initDataSource();
    }
  }

  private _filterInput!: ElementRef;
  @ViewChild('filterInput') set filterInput(val: ElementRef) {
    this._filterInput = val;
    this.subscribeToFilterEvents();
  }
  get filterInput(): ElementRef {
    return this._filterInput;
  }
  
  cellTemplates: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
  @ContentChildren(TableCellDirective) set dataTableCellDirectives(val: QueryList<TableCellDirective>) {
    this.cellTemplates = new Map<string, TemplateRef<any>>();
    for (const element of val.toArray()) {
      this.cellTemplates.set(element.cellTemplateForColumn, element.templateRef);
    }
  }

  @ContentChild('tableTitleTemplate') tableTitleTemplate?: TemplateRef<Component>;
  @ContentChild('expandedRowTemplate') expandedRowTemplate?: TemplateRef<Component>;
  @ContentChild('middleToolbarPanelTemplate') middleToolbarPanelTemplate?: TemplateRef<Component>;
  @ContentChild('rightToolbarPanelTemplate') rightToolbarPanelTemplate?: TemplateRef<Component>;

  @Input() sortActive: string = '';
  @Input() sortDirection: SortDirection = '';

  private _dataSource?: TableDataSource<T>;
  get dataSource(): TableDataSource<T> | undefined {
    return this._dataSource;
  }

  private _data!: T[];
  @Input() set data(value: T[]) {
    if (!Array.isArray(value)) {
      throw new Error('Value should be an array!');
    }
    if (value !== undefined && value !== null) {
      this._data = value;
      this.initDataSource();
    }
  }
  get data(): T[] {
    return this._data;
  }

  @Input() showFilter = false;
  @Input() sortable = true;
  @Input() pageable = true;

  @Input() showRefreshButton = true;
  @Input() showDetailsButton = true;

  @Input() canShowDetails = false;

  @Input() tableTitle: string = '';
  @Input() filterKeyDelayMs = 500;
  @Input() hideHeader = false;

  @Input() disableExpand: (dataRow: any) => boolean = () => false;

  @Input() set expandable(val: boolean) {
    this._expandable = val;
    if (this.expandable) {
      this._columnsDefinition = [{ name: '_expand', header: '' }, ...this._columnsDefinition];
    } else {
      this._columnsDefinition.splice(this._columnsDefinition.findIndex(e => e.name === '_expand'), 1);
    }
  }
  get expandable(): boolean {
    return this._expandable;
  }

  @Input()
  set columnsDefinition(value: TableColumn[]) {
    this._columnsDefinition = value;
    if (this.expandable) {
      this._columnsDefinition = [{ name: '_expand', header: '' }, ...this._columnsDefinition];
    }
  }
  get columnsDefinition(): TableColumn[] {
    return this._columnsDefinition;
  }

  public get columnsNames(): string[] {
    if (this._columnsDefinition) {
      return this._columnsDefinition.filter((element) => !element.hidden).map((element) => element.name);
    } else {
      return [];
    }
  }

  public get dataColumns(): TableColumn[] {
    if (this._columnsDefinition) {
      return this._columnsDefinition.filter(element => {
        return (!element.hidden && element.name !== '_expand');
      });
    } else {
      return [];
    }
  }

  constructor() {
    this.dataReady = false;
  }

  ngOnInit(): void { }

  private initDataSource(): void {
    this._dataSource = new TableDataSource(this.data);
    if (this.sort !== undefined) {
      this._dataSource.sort = this.sort;
    }
    if (this.pageable && this.paginator !== undefined) {
      this._dataSource.paginator = this.paginator;
    }
    // workaround for mixed context (numbers & strings) sorting - see: https://github.com/angular/material2/issues/9966:
    this._dataSource.sortingDataAccessor = (data, header) => data[header as keyof T];

    this.activeRow = undefined;
    this.rowActivated.emit(undefined);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initDataSource();
    });    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  private subscribeToFilterEvents(): void {
    this.subscription.unsubscribe();
    if (this.filterInput) {
      this.subscription = fromEvent(this.filterInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(this.filterKeyDelayMs), // before emitting last event
          distinctUntilChanged()
        )
        .subscribe({
          next: () => this.applyFilter(this.filterInput.nativeElement?.value)
        });
    }
  }

  getCellTemplate(column: string, defaultTemplate: TemplateRef<any>): TemplateRef<any> {
    const template = this.cellTemplates.get(column);
    if (template) {
      return template;
    } else {
      return defaultTemplate;
    }
  }

  getTableTitleTemplate(defaultTemplate: TemplateRef<any>): TemplateRef<any> {
    const template = this.tableTitleTemplate;
    if (template) {
      return template;
    } else {
      return defaultTemplate;
    }
  }

  applyFilter(filterValue: string): void {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  onRowClick(row: T): void {
    if (this.activeRow !== row) {
      this.activeRow = row;
      this.rowActivated.emit(row);
    }
  }

  shouldExpandBeDisabled(row: any): boolean {
    return this.disableExpand(row);
  }

  onRowExpandClick(row: T): void {
    if (this.disableExpand(row)) {
      return;
    }
    if (this.expandedRow === row) {
      const collapsedRow = this.expandedRow;
      this.expandedRow = undefined;
      this.rowCollapsed.emit(collapsedRow);
    } else {
      const collapsedRow = this.expandedRow;
      this.expandedRow = row;
      if (collapsedRow) { this.rowCollapsed.emit(collapsedRow); }
      this.rowExpanded.emit(this.expandedRow);
    }
  }

  onRowDblClick(row: T): void {
    this.rowDblClick.emit(row);
  }

  onDetailsClicked(event: Event): void {
    this.detailsButtonClicked.emit(this.activeRow);
  }

  onRefreshClicked(event: Event): void {
    this.refreshButtonClicked.emit(null);
  }

  disableDetailsButtons(): void {
    this.disableDetailsButton();
  }

  private disableDetailsButton(): void {
    this.canShowDetails = false;
  }

  isEmptyTable(): boolean {
    if (!this.dataSource) {
      return true;
    }
    const data = this.dataSource.filteredData || this.dataSource.data;
    if (data) {
      return ((data.length > 0) ? false : true);
    }
    return true;
  }
}
