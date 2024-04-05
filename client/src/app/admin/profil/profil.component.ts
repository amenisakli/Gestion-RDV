import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { tokenGetter } from 'src/app/login/login.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
user:User [] | any
token = tokenGetter()


constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getToken(this.token).subscribe((data)=>{
      this.user = data      
    })
  }
}
