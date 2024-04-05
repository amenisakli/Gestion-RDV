import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { tokenGetter } from '../../login/login.service';
import { UserService } from '../../admin/user/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchForm: FormGroup;
  showModal:boolean = false
  constructor( private formBuilder: FormBuilder,private router: Router , private userService:UserService) {
    this.searchForm = this.formBuilder.group({
      matricule: ['', Validators.required]
    });
  }
  title = 'client2';
  showMenu : boolean = true

  onSubmit() {        
      const matricule = this.searchForm.value.matricule;
      this.showModal = false;
      window.location.href = '/rdv/' + matricule;
  }

  login() {
    this.router.navigate(['/login']);
    this.showMenu = false;
  }
}
