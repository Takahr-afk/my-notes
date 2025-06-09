import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router) {
    this.user$ = user(this.auth);
  }

  async login(email: string, password: string): Promise<void> {
    try {

      await signInWithEmailAndPassword(this.auth, email, password);
      await this.router.navigate(['/notes']);
    } catch (error) {
      console.error('Loging in:', error);
      throw error;
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      await this.router.navigate(['/notes']);
    } catch (error) {
      console.error('Registering: error', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isLoggedIn(): Observable<User | null> {
    return this.user$;
  }
}
