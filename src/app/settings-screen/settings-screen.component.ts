import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../shared/header/header.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-settings-screen',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './settings-screen.component.html',
  styleUrl: './settings-screen.component.scss',
})
export class SettingsScreenComponent {
  private readonly authService = inject(AuthService);

  public isAdmin = this.authService.isAdmin;

  // Temp solution, TODO: refactor this
  public toggleIsAdmin() {
    if (this.isAdmin()) {
      const password = prompt('Enter the admin password');
      if (password) {
        this.authService.authenticateAdmin(password);
      }
    } else {
      this.authService.unauthenticateAdmin();
    }
  }
}
