import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Observable, startWith, switchMap } from 'rxjs';

import { BookComponent } from '@shared/components/book/book.component';
import { IBook } from '@shared/models/book.interface';
import { BookService } from './services/book.service';
import { BookDeleteDialogComponent } from './components/book-delete-dialog/book-delete-dialog.component';
import { BookDetailsDialogComponent } from './components/book-details-dialog/book-details-dialog.component';
import { BookEditDialogComponent } from './components/book-edit-dialog/book-edit-dialog.component';

const IMPORTS = [
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  BookComponent,
  AsyncPipe,
  NgFor,
];

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: IMPORTS,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('inOutScaleAnimation', [
      transition(':enter', [
        style({ 'transform': 'scale(0)' }),
        animate('300ms ease-out', style({ 'transform': 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ 'transform': 'scale(1)' }),
        animate('300ms ease-out', style({ 'transform': 'scale(0)' })),
      ]),
    ]),
  ]
})
export class BookListComponent {
  books$: Observable<IBook[]>;
  searchControl = new FormControl('', { nonNullable: true });
  
  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
  ) {
    this.books$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      distinctUntilChanged(),
      switchMap(searchQuerry => this.bookService.getFilteredBooks(searchQuerry)),
    );
  }

  openDetails(book: IBook): void {
    this.dialog.open(BookDetailsDialogComponent, {
      data: book,
    });
  }

  addItem(): void {
    const dialogRef = this.dialog.open(BookEditDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data) this.bookService.addBook(data);
    });
  }

  editItem(book: IBook, index: number): void {
    const dialogRef = this.dialog.open(BookEditDialogComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) this.bookService.replaceBook(data, index);
    });
  }

  deleteItem(book: IBook, index: number): void {
    const dialogRef = this.dialog.open(BookDeleteDialogComponent<IBook>, {
      data: book,
    });

    dialogRef.afterClosed().subscribe(action =>{
      if (action) this.bookService.removeBook(index);
    });
  }

  trackByFn(index: number): number {
    return index;
  }
}
