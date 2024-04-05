import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rdv } from 'src/app/client/rdv/rdv';
import { RdvService } from 'src/app/client/rdv/rdv.service';
import { map } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rdv-a',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './rdv-a.component.html',
  styleUrls: ['./rdv-a.component.css']
})
export class RdvAComponent implements OnInit{
  rdv : Rdv | any
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalItems!: number;
  totalPages!: number;
  paginatedData: Rdv[] = [];
  SelectedidRdv!: any
  showModalRdv:boolean = false
  constructor(private rdvService:RdvService){}
  ngOnInit(): void {
    this.fetchData()
  }
  isDateConflict(date: string): boolean {
    const count = this.rdv.filter((rd:any) => rd.date === date&& rd.etat === true).length;
    return count > 1;
  }
  fetchData() {
    this.rdvService.getRdv().pipe(
      map((data: any) => {
        return data.sort((a: any, b: any) => b.id - a.id);
      }),
      map((sortedData: any) => sortedData.filter((item: any) => item.status === true))
    ).subscribe(filteredData => {      
      this.rdv = filteredData;      
      this.paginatedData = filteredData;
      this.totalItems = filteredData.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.paginateData();
    });
  }
  
  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;        
    this.paginatedData = this.rdv.slice(startIndex, endIndex);      
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
  openRdv(id:any){
    this.SelectedidRdv = id 
    this.showModalRdv = true
  }
  SupprimerPat(){
    this.rdvService.delete(this.SelectedidRdv).subscribe(() =>{
      window.location.href = window.location.href
      this.showModalRdv = false
    })
  }}
