import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { UserService } from '../user/user.service';
import { tokenGetter } from 'src/app/login/login.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  token = tokenGetter()
  user: any
  showMenu: boolean = true

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getToken(this.token).subscribe(data => {
      this.user = data
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showMenu = !event.url.includes('login');
      }
    });
  }
  showToggel: boolean = false
  open() {
    this.showToggel = !this.showToggel;
  }
  logout() {
    var cookiesToExclude = ['offlineMessageCount'];
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (!cookiesToExclude.includes(name)) {
        document.cookie = name + "=;expires=" + new Date(0).toUTCString();
      }
    }
    location.href = '/login';

  }
}
