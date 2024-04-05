import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from 'src/app/client/service/service.service';
import { Service } from 'src/app/client/service/service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-c',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './service-c.component.html',
  styleUrls: ['./service-c.component.css']
})
export class ServiceCComponent implements OnInit{

  service:Service[] | any
  SelectedidSer!: any
  showModalSer:boolean = false
  constructor(private serviceService:ServiceService){}

  ngOnInit(){
this.serviceService.getService().subscribe(data =>{
  this.service = data.sort((a:any, b:any) => b.id - a.id);  
})
  }
  openSer(id: any) {    
    this.SelectedidSer = id
    this.showModalSer = true
  }
  SupprimerSer() {
    this.serviceService.deleteService(this.SelectedidSer).subscribe(() => {
      window.location.href = window.location.href
      this.showModalSer = false
    })
  }
}
