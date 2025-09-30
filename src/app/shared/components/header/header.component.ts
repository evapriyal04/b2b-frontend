import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule], // ✅ include CommonModule
  template: `
    <header class="h-16 flex items-center justify-end bg-white border-b border-gray-200 p-4 shadow-sm relative">
      <div class="flex items-center space-x-4">
        <ng-container *ngIf="currentUser$ | async as user">
          <div class="relative">
            <button (click)="toggleDropdown()" class="flex items-center space-x-2 text-secondary hover:text-primary transition-colors focus:outline-none">
              <span class="hidden sm:inline font-medium text-sm">{{ user.name }} ({{ user.role | titlecase }})</span>
              <div class="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-white font-semibold text-sm ring-2 ring-accent/50">
                {{ user.name.charAt(0) }}
              </div>
              <lucide-icon name="chevron-down" [size]="16" class="transition-transform" [class.rotate-180]="isDropdownOpen"></lucide-icon>
            </button>

            <div *ngIf="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-20 border border-gray-100">
              <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                <p class="font-semibold truncate">{{ user.email }}</p>
                <p class="text-xs text-secondary mt-0.5">{{ user.company }}</p>
              </div>
              <a routerLink="/profile" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                <lucide-icon name="user" [size]="18" class="mr-2 text-secondary/70"></lucide-icon>
                Profile
              </a>
              <hr class="my-1 border-gray-100">
              <button (click)="logout()" class="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50/50 transition-colors">
                <lucide-icon name="log-out" [size]="18" class="mr-2"></lucide-icon>
                Logout
              </button>
            </div>
          </div>
        </ng-container>

        <button class="p-2 rounded-full text-secondary hover:bg-gray-100 transition-colors">
          <lucide-icon name="bell" [size]="20"></lucide-icon>
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  currentUser$: Observable<User | null>;
  isDropdownOpen: boolean = false;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
  }
}
