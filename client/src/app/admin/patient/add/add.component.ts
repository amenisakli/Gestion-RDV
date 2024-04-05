import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Patient } from 'src/app/client/patient/patient';
import { PatientService } from 'src/app/client/patient/patient.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule ,FormsModule, ReactiveFormsModule , RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  PatientForm = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    tel: new FormControl(),
    dossier: new FormControl(),
    numero: new FormControl()
  })
  patient: Patient[] | any
  alertMat:boolean = false
  mat:any
  constructor(private patientService:PatientService){}
  AjouterPatient() {
    this.patientService.AddPatient(this.PatientForm.value).subscribe(data => {
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
