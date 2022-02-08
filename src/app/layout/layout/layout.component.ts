import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

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
        if (event instanceof NavigationStart) {
          if (event.url === '/login' || event.url === '/' ||
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
