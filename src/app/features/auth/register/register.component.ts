import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  roles: string[] = ['admin', 'distributor', 'customer'];
  isSubmitting: boolean = false;
  formError: string = '';
  formSuccess: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.formError = '';
    this.formSuccess = '';

    if (form.invalid) {
      this.formError = 'Please fill all required fields correctly.';
      return;
    }

    this.isSubmitting = true;

    const formData = form.value;

    this.authService.register(formData).subscribe({
      next: (res: User) => {
        this.formSuccess = 'Registration successful!';
        form.resetForm();
        this.isSubmitting = false;
      },
      error: (err: any) => {
        console.error('Registration error:', err);
        this.formError = 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
