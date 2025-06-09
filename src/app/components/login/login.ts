import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    try {
      await this.authService.login(this.email, this.password);
    } catch (error: any) {
      this.error = 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
      console.error('Login error:', error);
    }
  }
}
