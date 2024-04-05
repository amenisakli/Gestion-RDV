import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id!: number
  role: Role | any
  RoleForm = new FormGroup ({
    name :new FormControl()
  })
  showAlert:boolean =false
  constructor(private roleService: RoleService, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.roleService.getRoleById(this.id).subscribe(
        data => {
          this.role = data;
        });
    });
  }
  Submit(){
    this.roleService.updateRole(this.RoleForm.value,this.id).subscribe(data =>{
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false;
        window.history.back();
    }, 2000);
    })
  }
}
