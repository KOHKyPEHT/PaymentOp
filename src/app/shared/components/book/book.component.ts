import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBook } from '../../models/book.interface';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  @Input({ required: true }) book!: IBook;
  @Output() bookClick = new EventEmitter<IBook>();
  
  constructor(private renderer: Renderer2) {}
  
  onImageError(image: HTMLImageElement): void {
    this.renderer.setStyle(image, 'display', 'none');
  }

  onClick(): void {
    this.bookClick.emit(this.book);
  }
}
