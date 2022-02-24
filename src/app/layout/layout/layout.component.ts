import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  showHead = false;
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/login' || event.url === '/' || event.url === '/forgotPassword' ||
            event.url === '/resetPassword' || event.url === '/passwordChanged') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
    }

  ngOnInit(): void {}
}
