import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  isSubmitting: boolean = false;
  formError: string = '';
  formSuccess: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.formError = '';
    this.formSuccess = '';

    if (form.invalid) {
      this.formError = 'Please enter a valid email.';
      return;
    }

    this.isSubmitting = true;

    const email = form.value.email;

    // Dummy API call
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.formSuccess = 'Password reset link has been sent to your email.';
        form.resetForm();
        this.isSubmitting = false;
      },
      error: (err: any) => {
        console.error('Forgot Password error:', err);
        this.formError = 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
