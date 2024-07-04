import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './feature/book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BookListComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  
}
