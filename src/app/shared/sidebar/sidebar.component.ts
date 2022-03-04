import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  showHead = false;
  role: boolean = true;
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        
        if (event.url === '/audit') {
          this.showHead = true;
        } else {
          this.showHead = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
  }
}
