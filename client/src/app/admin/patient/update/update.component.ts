import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Patient } from 'src/app/client/patient/patient';
import { PatientService } from 'src/app/client/patient/patient.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  PatientForm = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    tel: new FormControl(),
    dossier: new FormControl(),
    numero: new FormControl(),
    email: new FormControl()

  })
  patient: Patient[] | any
  alertMat: boolean = false
  mat: any
  id: any
  constructor(private patientService: PatientService, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.patientService.getPatientBuId(this.id).subscribe(
        data => {
          this.patient = data;          
        });
    });
  }
  ModifierPatient() {
    this.patientService.editPatient(this.id,this.PatientForm.value).subscribe(data => {
      this.patient = data
      this.mat = this.patient.matricule;
      this.alertMat = true
      setTimeout(() => {
        this.alertMat = false;
        window.history.back();
    }, 2000);
    })
}
}
