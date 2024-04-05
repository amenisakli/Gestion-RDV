import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { tokenGetter } from './login/login.service';
import { UserService } from './admin/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client2';
  showMenu : boolean = true
  token = tokenGetter()
  constructor(private router: Router , private userService:UserService) {}
  ngOnInit(): void {
    initFlowbite()
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
