import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { IBook } from '@shared/models/book.interface';

const books: IBook[] = [
  {
    title: 'Test of Test',
    author: 'Hello',
    publicationYear: '1990',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos natus doloribus reiciendis dolore quia soluta tempore, eaque et perspiciatis quaerat asperiores atque fugit eum in eveniet? Officia impedit molestiae atque dolorem, numquam recusandae exercitationem voluptas! Laboriosam dolores ullam quidem animi dolorem in, distinctio eos exercitationem asperiores vero, repellat minima soluta nihil incidunt, magni cum qui voluptas illo eum mollitia? Pariatur similique ipsum voluptatum eaque saepe expedita possimus voluptatem recusandae? Eum numquam deleniti magnam expedita molestiae ipsum laboriosam tempora eius corrupti voluptatum aspernatur inventore, ad cum architecto dolores ab dolore, possimus placeat praesentium consectetur ducimus iure. Voluptate nesciunt fuga asperiores architecto quisquam ab neque harum libero error eligendi debitis, odio consectetur repellendus labore! Suscipit repudiandae aperiam cupiditate nemo eius voluptatibus tenetur, nisi, accusamus dolore culpa quibusdam totam. Maxime veritatis vitae accusamus non ducimus illum, ea nobis cum repellat dolorum, sit nesciunt nemo? Minus dolorem voluptate repellendus amet sapiente! Omnis adipisci ducimus minus, deserunt neque quidem quibusdam laboriosam ratione exercitationem fugit totam. Assumenda delectus iure dignissimos iste voluptate inventore modi pariatur saepe itaque quo est vitae, tempora repellat nihil tempore, omnis sequi. Voluptate possimus maiores architecto ipsa? Asperiores quisquam laborum fugit debitis magni quae possimus totam cum distinctio ab, repellat alias aperiam.',
    imageUrl: 'https://m.media-amazon.com/images/I/71Yt-BtAfEL._AC_SL1000_.jpg'
  },
  {
    title: 'Test of Test 2',
    author: 'Hiya',
    publicationYear: '1991',
  },
  {
    title: 'Test of Test 3',
    author: 'Wazzup',
    publicationYear: '1992',
  },
  {
    title: 'Test of asdf as asf asfasdf as ffasf Test',
    author: 'Hola',
    publicationYear: '1993',
  },
];

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _books$ = new BehaviorSubject<IBook[]>(books);

  getBooks(): Observable<IBook[]> {
    return this._books$.asObservable();
  }

  getFilteredBooks(searchQuerry: string): Observable<IBook[]> {
    return this._books$.asObservable().pipe(
      map(books => books.filter(book => book.title.toLowerCase().includes(searchQuerry) || book.author.toLowerCase().includes(searchQuerry)))
    );
  }

  addBook(book: IBook): void {
    this._books$.next([...this._books$.getValue(), book]);
  }

  replaceBook(book: IBook, idx: number): void {
    const books: IBook[] = JSON.parse(JSON.stringify(this._books$.value));
    books[idx] = book;
    this._books$.next(books);
  }

  removeBook(idx: number): void {
    const books: IBook[] = JSON.parse(JSON.stringify(this._books$.value));
    books.splice(idx, 1);
    this._books$.next(books);
  }
}
