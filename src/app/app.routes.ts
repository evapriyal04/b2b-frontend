import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // -------------------- Root redirect --------------------
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

  // -------------------- Auth Layout --------------------
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      // Default redirect inside auth
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      // Login page
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },

      // Register page
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },

      // Forgot password
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
      },
    ],
  },

  // -------------------- Main Layout (Protected) --------------------
  {
    path: ' ', // <--- unique prefix, prevents empty path conflict
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },

      {
        path: 'orders/my-orders',
        loadComponent: () =>
          import('./features/orders/my-orders/my-orders.component').then(
            (m) => m.MyOrdersComponent
          ),
      },

      {
        path: 'orders/create',
        loadComponent: () =>
          import('./features/orders/create-order/create-order.component').then(
            (m) => m.CreateOrderComponent
          ),
      },

      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },

      {
        path: 'excel-upload',
        loadComponent: () =>
          import('./features/excel-upload/excel-upload.component').then(
            (m) => m.ExcelUploadComponent
          ),
      },
    ],
  },

  // -------------------- Wildcard fallback --------------------
  { path: '**', redirectTo: 'auth/login' },
];
