import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { UserService } from './user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

user : User [] | any
SelectedidUs!: any
showModalUs:boolean = false
constructor(private userService:UserService,private router:Router){}
ngOnInit(): void {

this.userService.getUser().subscribe(data => {
  this.user = data.sort((a:any, b:any) => b.id - a.id);
  console.log(data);
  
})}
openSer(id: any) {    
  this.SelectedidUs = id
  this.showModalUs = true
}
SupprimerUs() {
  this.userService.deleteUser(this.SelectedidUs).subscribe(() => {
    window.location.href = window.location.href
    this.showModalUs = false
  })
}
update(id:any){
this.router.navigate(['user/update/',id])
}
}
