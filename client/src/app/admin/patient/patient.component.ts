import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from 'src/app/client/patient/patient';
import { PatientService } from 'src/app/client/patient/patient.service';
import { map } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalItems!: number;
  totalPages!: number;
  paginatedData: Patient[] = [];
  patient:Patient | any=[]
  SelectedidPat!: any
showModalPat:boolean = false
  constructor(private patientService:PatientService){}
  
  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;        
    this.paginatedData = this.patient.slice(startIndex, endIndex);      
  }


  ngOnInit() {
    this.fetchData()
  }
  fetchData() {
    this.patientService.getPatient().pipe(
      map((data: any) => {
        return data.sort((a: any, b: any) => b.id - a.id);
      }),
      map((sortedData: any) => sortedData.filter((item: any) => item.status === true))
    ).subscribe(filteredData => {
      this.patient = filteredData;      
      this.paginatedData = filteredData;
      this.totalItems = filteredData.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.paginateData();
    });
  }
  
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.paginateData();      
    }
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }    
  } 
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }
  openPatient(id:any){
    this.SelectedidPat = id 
    this.showModalPat = true
  }
  SupprimerPat(){
    this.patientService.deletePatient(this.SelectedidPat).subscribe(() =>{
      window.location.href = window.location.href
      this.showModalPat = false
    })
  }
}
