import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, RouterModule } from '@angular/router';
import { UserService } from '../../admin/user/user.service';
import { tokenGetter } from '../../login/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  showMenu : boolean = true
  showToggel : boolean = false
  token = tokenGetter()
  constructor(private router: Router , private userService:UserService) {}
  open() {
    this.showToggel = !this.showToggel;
}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showMenu = !event.url.includes('login');
      } 
    });
  }

  login() {
    this.router.navigate(['/login']);
    this.showMenu = false;
  }
}
