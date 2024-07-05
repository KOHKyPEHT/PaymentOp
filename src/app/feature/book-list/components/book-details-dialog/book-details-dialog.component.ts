import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { IBook } from '@shared/models/book.interface';

@Component({
  selector: 'app-book-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf],
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IBook) {}
}
