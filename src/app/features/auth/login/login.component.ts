import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
  role?: 'admin' | 'distributor' | 'customer';
  token?: string;
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  private dummyCredentials = {
    admin: { email: 'admin@froneri.com', password: 'admin123' },
    distributor: { email: 'distributor@froneri.com', password: 'dist123' },
    customer: { email: 'customer@froneri.com', password: 'cust123' }
  };

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onLogin(): Promise<void> {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;

    try {
      const response = await this.mockAuthService(this.email, this.password);

      if (response.success && response.token) {
        // Store auth info
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role || '');
        localStorage.setItem('userEmail', this.email);

        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = response.message || 'Login failed. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred. Please try again later.';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private mockAuthService(email: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let role: 'admin' | 'distributor' | 'customer' | null = null;

        if (email === this.dummyCredentials.admin.email &&
            password === this.dummyCredentials.admin.password) role = 'admin';
        else if (email === this.dummyCredentials.distributor.email &&
                 password === this.dummyCredentials.distributor.password) role = 'distributor';
        else if (email === this.dummyCredentials.customer.email &&
                 password === this.dummyCredentials.customer.password) role = 'customer';

        if (role) {
          resolve({ success: true, role, token: `mock_token_${role}_${Date.now()}`, message: 'Login successful' });
        } else {
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 1000);
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /** Navigate to Forgot Password Page */
  onForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  /** Navigate to Register Page */
  onRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
