import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    return true; // allow navigation
  } else {
    // redirect to login
    window.location.href = '/auth/login';
    return false;
  }
};
