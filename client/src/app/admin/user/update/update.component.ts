import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { User } from '../user';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLinkWithHref],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  id:any
  user : User[] | any 
  roleSelected:any ='defaultRoleValue'

  UserForm = new FormGroup({
    name: new FormControl (),
    lastname: new FormControl(),
    tel: new FormControl (),
    email: new FormControl(),
    roleId: new FormControl (this.roleSelected)
  });
  role : any
showAlert:boolean = false
  constructor(private userService: UserService, private router: ActivatedRoute,private formBuilder:FormBuilder,private roleService:RoleService) { }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));      
      this.userService.getUserById(this.id).subscribe(
        data => {
          this.user = data;  
            this.roleSelected = this.user.roleId.id
            this.UserForm.controls['roleId'].setValue(this.roleSelected); 
        });
    });
    this.roleService.getRole().subscribe(data =>{
      this.role = data
    })
}
  Update(){    
    this.userService.updateUser(this.id,this.UserForm.value).subscribe(data =>{
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false;
        window.history.back();
    }, 2000);
    })
  }
}
