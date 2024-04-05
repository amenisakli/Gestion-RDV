import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../role.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  RoleForm = new FormGroup(
    {
      name: new FormControl()
    })
    showAlert:boolean = false
  constructor(private roleService:RoleService){}

Submit(){
  this.roleService.addRole(this.RoleForm.value).subscribe(data =>{
    this.showAlert = true
    setTimeout(() => {
      this.showAlert = false;
      window.history.back();
  }, 2000);
  })
}
}
