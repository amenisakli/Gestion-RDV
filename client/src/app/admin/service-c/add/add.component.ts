import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceService } from 'src/app/client/service/service.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  ServiceForm = new FormGroup({
    name: new FormControl(),
    desc: new FormControl(),
    pic : new FormControl(),
    type : new FormControl()
  })
  showAlert : boolean = false
  constructor(private serviceService:ServiceService){}
  submit(){
    this.serviceService.addService(this.ServiceForm.value).subscribe(data =>{  
      setTimeout(() => {
        this.showAlert = false;
        window.history.back();
    }, 2000);    
    })
  }
  onFileSelected(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  // Function to convert file to base64
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.ServiceForm.patchValue({
        pic: reader.result as string
      });
    };
  }
}
