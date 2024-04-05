import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from './service';
import { ServiceService } from './service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  service: Service[] | any

  constructor(private serviceService: ServiceService) { }
  ngOnInit(): void {
    this.serviceService.getService().subscribe((res) => {
      this.service = res
    })
  }
}
