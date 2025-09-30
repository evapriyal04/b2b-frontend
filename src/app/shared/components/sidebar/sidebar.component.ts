import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LucideAngularModule, LayoutDashboard, FileText, PlusCircle, BarChart3, UploadCloud, RefreshCw, Download, Settings, XCircle } from 'lucide-angular';

interface NavItem {
  icon: any;
  label: string;
  route: string;
  roles: ('admin' | 'distributor' | 'customer')[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isExpanded = true;
  currentUserRole$: Observable<'admin' | 'distributor' | 'customer' | null>;
  navItems: NavItem[] = [];

  private ALL_NAV_ITEMS: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard', roles: ['admin','distributor','customer'] },
    { icon: FileText, label: 'My Orders', route: '/orders/my-orders', roles: ['admin','distributor','customer'] },
    { icon: PlusCircle, label: 'Create Order', route: '/orders/create', roles: ['admin','distributor','customer'] },
    { icon: BarChart3, label: 'Reports', route: '/reports', roles: ['admin','distributor'] },
    { icon: UploadCloud, label: 'Excel Upload', route: '/excel-upload', roles: ['admin','distributor'] },
    { icon: RefreshCw, label: 'Rebilling', route: '/rebilling', roles: ['admin','customer'] },
    { icon: Download, label: 'Downloads', route: '/downloads', roles: ['admin','distributor','customer'] },
    { icon: UploadCloud, label: 'Distributor Upload', route: '/distributor-upload', roles: ['admin','distributor'] },
    { icon: XCircle, label: 'Excluded Items', route: '/excluded-items', roles: ['admin'] },
    { icon: Settings, label: 'Admin', route: '/admin/manage-users', roles: ['admin'] },
  ];

  constructor(private authService: AuthService) {
    this.currentUserRole$ = this.authService.currentUser$.pipe(
      map(user => user ? user.role : null)
    );
  }

  ngOnInit(): void {
    this.currentUserRole$.subscribe(role => {
      if (role) {
        this.navItems = this.ALL_NAV_ITEMS.filter(item => item.roles.includes(role));
      } else {
        this.navItems = [];
      }
    });
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  isActive(route: string): boolean {
    return window.location.pathname === route;
  }
}
