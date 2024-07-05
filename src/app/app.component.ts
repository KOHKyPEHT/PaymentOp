import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookListComponent } from './feature/book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  
}
