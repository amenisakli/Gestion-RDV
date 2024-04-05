import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RdvService } from './rdv.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Rdv } from './rdv';
import { PatientService } from '../patient/patient.service';
import { Patient } from '../patient/patient';

@Component({
  selector: 'app-rdv',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent {
  SelectedRdv: any;
  constructor(private route: ActivatedRoute, private rdvService: RdvService, private patientService: PatientService, private router: Router) { }
  rdvs: Rdv[] | any;
  patient: Patient[] | any = { matricule: '' }

  PatientForm = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    tel: new FormControl(''),
    dossier: new FormControl(''),
    numero: new FormControl(''),
    matricule: new FormControl(''),

  })
  showModal:boolean = false
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const matricule = params.get('matricule');
      if (matricule) {
        this.rdvService.getRdvByMat(matricule).subscribe(
          data => {
            this.rdvs = data            
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        console.error('Matricule parameter is missing.');
      }
      if (matricule) {
        this.patientService.getPatientByMat(matricule).subscribe(
          data => {
            this.patient = data
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        console.error('Matricule parameter is missing.');
      }
    });

  }
  onAddButtonClicked(matricule: string) {
    this.router.navigate(['/rdv/add', matricule]);
  }
  confirmer(id: any) {
    this.router.navigate(['/rdv/paiement', id]);

  }
  // Delete(id: any) {
  //   this.rdvService.delete(id).subscribe(res => {
  //     console.log('Item deleted successfully:', res);
  //   }, error => {
  //     console.error('Error deleting item:', error);
  //     // Handle error if needed
  //   });
  // }
  
  // onDelete() {
  //   this.rdvService.delete(this.rdvs.id).subscribe(() => {
  //     window.location.href = window.location.href;
  //   }, error => {
  //     console.error('Une erreur s\'est produite lors de la suppression des utilisateurs :', error);
  //   });
  // }
  // deselect() {
  //   this.showModal = false
  // }
  showModalRDV = false;
  SelectedidRdv!: any
  openRdv(id: any) {    
    this.SelectedidRdv = id
    this.showModalRDV = true
  }
  SupprimerRdv() {
    this.rdvService.delete(this.SelectedidRdv).subscribe(() => {
      window.location.href = window.location.href
      this.showModalRDV = false
    })
  }
}
