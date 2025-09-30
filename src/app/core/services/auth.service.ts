import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'distributor' | 'customer';
  company: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<User> {
    let role: 'admin' | 'distributor' | 'customer' = 'customer';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('dist')) role = 'distributor';

    const dummyUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      role,
      company: 'Acme Corp'
    };

    return of(dummyUser).pipe(
      delay(1000),
      tap(user => {
        localStorage.setItem('token', 'dummy-jwt-token');
        localStorage.setItem('role', user.role);
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // -------------------------------
  // Dummy Register Method
  // -------------------------------
  register(data: { companyName: string; userName: string; email: string; password: string; role: string }): Observable<User> {
    console.log('Registering user:', data);

    // Simulate 80% success rate
    const isSuccess = Math.random() < 0.8;

    if (isSuccess) {
      const newUser: User = {
        id: (Math.floor(Math.random() * 1000) + 1).toString(),
        name: data.userName,
        email: data.email,
        role: data.role as 'admin' | 'distributor' | 'customer',
        company: data.companyName
      };

      return of(newUser).pipe(
        delay(1000),
        tap(user => {
          console.log('User registered successfully:', user);
        })
      );
    } else {
      return throwError(() => new Error('Registration failed')).pipe(delay(1000));
    }
    
  }
  forgotPassword(email: string) {
  console.log('Forgot password requested for:', email);
  return of({ success: true }).pipe(delay(1000)); // dummy API call
}

}
