import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './book-delete-dialog.component.html',
  styleUrls: ['./book-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDeleteDialogComponent<T extends { title: string }> {
  constructor(
    public dialogRef: MatDialogRef<BookDeleteDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: T
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
