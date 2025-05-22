import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: false,
  template: `
    <div class="loading-overlay" *ngIf="isLoading">
      <mat-spinner diameter="50"></mat-spinner>
      <h1>Loading...</h1>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  `]
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.subscription = this.loadingService.loading$.subscribe(
      loading => {
        console.log('Loading state changed:', loading);
        this.isLoading = loading;
      }
    );
  }

  ngOnInit() {
    console.log('LoadingComponent initialized');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 