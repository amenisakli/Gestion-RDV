import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from './role';
import { RoleService } from './role.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{
  role : Role | any 
  SelectedidRol!: any
showModalRol:boolean = false
constructor(private roleService:RoleService){}
ngOnInit(): void {
  this.roleService.getRole().subscribe(data =>{
    this.role = data.sort((a:any, b:any) => b.id - a.id);
  })
}
openRol(id:any){
  this.SelectedidRol = id
  this.showModalRol = true
}
SupprimerRol(){
  this.roleService.deleteRole(this.SelectedidRol).subscribe(() => {
    window.location.href = window.location.href
    this.showModalRol = false
  })
}
}
