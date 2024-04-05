import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient/patient.service';
import { RdvService } from '../rdv/rdv.service';
import { Rdv } from '../rdv/rdv';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaiementService } from './paiement.service';
import { Paiement } from './paiement';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  rdvs: Rdv[] | any;
  patient: Rdv[] | any;
  paiement: Paiement[] | any;

  codeConf: boolean = false
  ItemId: any;
  ConfirmedForm = new FormGroup({
    email: new FormControl(),
    type_carte: new FormControl(),
    code: new FormControl(),
    num_carte: new FormControl(),
    montant:new FormControl()
  })
  idPatient: any
  showAler: boolean = false
  constructor(private route: ActivatedRoute, private paiementService: PaiementService, private rdvService: RdvService, private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.ItemId = Number(param.get('id'));
      this.rdvService.getRdvById(this.ItemId).subscribe(
        data => {
          this.rdvs = data;
          this.idPatient = this.rdvs.patientId.id
        });
    });
  }
  ajouter() {
    const appointmentData = {
      email: this.ConfirmedForm.value.email,
    };

    this.patientService.editPatient(this.idPatient, appointmentData).subscribe(data => {
      const PaiementData = {
        code: this.ConfirmedForm.value.code,
        type_carte: this.ConfirmedForm.value.type_carte,
        num_carte : this.ConfirmedForm.value.num_carte, 
        montant : this.ConfirmedForm.value.montant,
        patientId: this.idPatient
      };
      this.paiementService.AddPaiementt(PaiementData).subscribe(data => {
        this.showAler = true
        this.paiement = data
        setTimeout(() => {
          this.showAler = false;
          window.history.back();
      }, 2000);
        this.rdvService.confirmer(this.rdvs.id).subscribe(data => {
        })
      })
    })
  }
}
