import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private mockItems: Item[] = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
    { id: 4, name: 'Item 4', description: 'Description for Item 4' },
    { id: 5, name: 'Item 5', description: 'Description for Item 5' }
  ];

  constructor() {}

  getItems(): Observable<Item[]> {
    return of(this.mockItems).pipe(delay(1000));
  }
} 