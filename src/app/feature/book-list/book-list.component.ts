import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { BookComponent } from '@shared/components/book/book.component';
import { IBook } from '@shared/models/book.interface';
import { BookService } from './services/book.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookDeleteDialogComponent } from './components/book-delete-dialog/book-delete-dialog.component';
import { BookDetailsDialogComponent } from './components/book-details-dialog/book-details-dialog.component';
import { BookEditDialogComponent } from './components/book-edit-dialog/book-edit-dialog.component';

const IMPORTS = [
  MatButtonModule,
  MatDialogModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent {
  books$: Observable<IBook[]>;
  
  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
  ) {
    this.books$ = this.bookService.getBooks();
  }

  openDetails(book: IBook): void {
    this.dialog.open(BookDetailsDialogComponent, {
      data: book,
    });
  }

  addItem(): void {

  }

  editItem(book: IBook, index: number): void {
    const dialogRef = this.dialog.open(BookEditDialogComponent, {
      data: book,
    });
  }

  deleteItem(book: IBook, index: number): void {
    const dialogRef = this.dialog.open(BookDeleteDialogComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe(action =>{
      if (action) this.bookService.removeBook(index);
    });
  }
}
