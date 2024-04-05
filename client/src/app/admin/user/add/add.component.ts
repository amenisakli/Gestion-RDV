import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RoleService } from '../../role/role.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  UserForm: FormGroup | any
  role : any
  showAlert :boolean = false
  constructor(private userService:UserService,private formBuilder: FormBuilder,private roleService:RoleService){}
  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleId: ['Choisir un rôle', Validators.required] // Définir la valeur par défaut ici
    });
this.roleService.getRole().subscribe(data =>{
  this.role = data
})
  }
  Submit(){
    this.userService.AddUser(this.UserForm.value).subscribe(data =>
      {
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false;
          window.history.back();
      }, 2000);
    })
  }
}
