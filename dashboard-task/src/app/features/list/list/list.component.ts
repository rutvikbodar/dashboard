import { Component, OnInit } from '@angular/core';
import { ListService, Item } from '../../../core/services/list.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false
})
export class ListComponent implements OnInit {
  items: Item[] = [];
  error: string = '';

  constructor(private listService: ListService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.error = '';
    this.loadingService.show();
    this.listService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.loadingService.hide();
      },
      error: (error: Error) => {
        this.error = 'Failed to load items';
        this.loadingService.hide();
      }
    });
  }
} 
