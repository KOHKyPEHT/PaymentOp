import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { IBook } from '@shared/models/book.interface';

@Component({
  selector: 'app-book-edit-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf],
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditDialogComponent {
  bookForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    author: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    publicationYear: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{4}$/)] }),
    description: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    imageUrl: new FormControl<string | undefined>(undefined, { nonNullable: true }),
  });

  constructor(
    public dialogRef: MatDialogRef<BookEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IBook,
  ) {
    if (data) this.bookForm.patchValue(data);
  }

  onSubmit(): void {
    const book = this.bookForm.getRawValue() satisfies IBook;
    this.dialogRef.close(book);
  }
}
