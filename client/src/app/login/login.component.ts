import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm = new FormGroup({
    email: new FormControl(
      // '', [Validators.required, Validators.email]
      ),
    password: new FormControl(
      // '', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
      )
  });
constructor(private loginService:LoginService,private route:Router){}


Login(){    
  this.loginService.login(this.LoginForm.value).pipe(first()).subscribe((data: any) => {
    if (data && data.token) {
      document.cookie = `token=${data.token}`;
      location.href = '/admin';
    }
  });
}





}
