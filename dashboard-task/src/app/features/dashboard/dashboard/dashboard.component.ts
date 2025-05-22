import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userEmail = this.authService.getUserEmail();
  }
} 