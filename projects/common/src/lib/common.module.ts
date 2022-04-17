import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponent } from './common.component';
import { AppSpinnerComponent } from './components/app-spinner/app-spinner.component';
import { TableComponent } from './components/table';
import { TableCellDirective } from './components/table/directives';
import { TreeComponent } from './components/tree/tree.component';

@NgModule({
  declarations: [
    CommonComponent,
    TableComponent,
    TableCellDirective,
    AppSpinnerComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatIconModule
  ],
  exports: [
    CommonComponent,
    TableComponent,
    TableCellDirective,
    AppSpinnerComponent,
    TreeComponent
  ]
})
export class AppCommonModule { }
