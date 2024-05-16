import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceService } from 'src/app/client/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/client/service/service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  ServiceForm = new FormGroup({
    name: new FormControl('Sélectionner service'),
    desc: new FormControl(),
    pic: new FormControl(),
    type : new FormControl()
  })
  id: any
  service: Service[] | any = [];
  imageURL: string | any
  showAlert:boolean = false
  constructor(private serviceService: ServiceService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.serviceService.getServiceById(this.id).subscribe(
        data => {
          this.service = data;          
          this.imageURL = this.service.pic
          
        });
    });
  }

  submit() {
    this.serviceService.updateService(this.id, this.ServiceForm.value).subscribe(data => {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false;
        window.history.back();
    }, 2000);

    })      
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newImageURL = reader.result as string;
      if (newImageURL) {
        this.imageURL = newImageURL;
        this.ServiceForm.value.pic = this.imageURL;
      }
    };
  }
  

}
