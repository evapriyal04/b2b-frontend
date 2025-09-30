import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,       // must be standalone
  imports: [CommonModule], // include CommonModule for template directives
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // fixed typo
})
export class DashboardComponent {
  // Add any dashboard logic here
}
