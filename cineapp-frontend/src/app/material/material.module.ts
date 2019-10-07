import { MatPaginatorImpl } from './mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, MatToolbarModule, MatSnackBarModule, MatInputModule, MatSortModule, MatCardModule, MatOptionModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatDividerModule, MatSidenavModule, MatMenuModule, MatDialogModule, MatStepperModule, MatGridListModule, MatCheckboxModule, MatListModule, MatChipsModule, MAT_DATE_LOCALE, MatTabsModule, MatPaginatorIntl } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule
  ], exports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule    
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class MaterialModule { }
