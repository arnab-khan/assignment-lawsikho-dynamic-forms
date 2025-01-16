import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menuItems = [
    {
      label: 'Login',
      path: 'login'
    },
    {
      label: 'Registration',
      path: 'registration'
    },
    {
      label: 'User Details',
      path: 'user-details'
    }
  ];
}
