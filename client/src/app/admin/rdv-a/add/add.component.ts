import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Patient } from 'src/app/client/patient/patient';
import { PatientService } from 'src/app/client/patient/patient.service';
import { Rdv } from 'src/app/client/rdv/rdv';
import { RdvService } from 'src/app/client/rdv/rdv.service';
import { Service } from 'src/app/client/service/service';
import { ServiceService } from 'src/app/client/service/service.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  MONTH_NAMES = [
    'Janviere',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'September',
    'October',
    'November',
    'December'
  ];
  DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Vend', 'Sam'];
  showDatepicker = false;
  date!: string;
  month!: number;
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  holidays: { date: number, month: number }[] = [
    { date: 1, month: 1 },
    { date: 20, month: 3 },
    { date: 9, month: 4 },
    { date: 10, month: 4 },
    { date: 1, month: 5 },
    { date: 16, month: 6 },
    { date: 17, month: 6 },
    { date: 7, month: 7 },
    { date: 25, month: 7 },
    { date: 13, month: 8 },
    { date: 15, month: 9 },
    { date: 15, month: 10 },
    { date: 17, month: 12 },
  ];
  service: Service[] | any
  rdv: Rdv[] | any

  id: any;
  showAlert: boolean = false

  constructor(private router: Router, private rdvService: RdvService, private patientService: PatientService, private route: ActivatedRoute, private serviceService: ServiceService) { }
  RdvForm = new FormGroup({
    date: new FormControl(),
    serviceId: new FormControl('Sélectionner service'),
    patientId: new FormControl('Sélectionner patient')
  })
  matricule: any
  patient: Patient | any
  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.serviceService.getService().subscribe(
      data => {
        this.service = data;
    });
    this.patientService.getPatient().subscribe(
      data => {
        this.patient = data;
    });
  }
  AjouterRdv() {
    this.rdvService.AddRdv(this.RdvForm.value).subscribe(data => {
      this.rdv = data
      setTimeout(() => {
        window.history.back();
    }, 2000);
    })
  }
  isHoliday(date: number, month: number): boolean {
    return this.holidays.some(holiday => holiday.date === date && holiday.month === month + 1);
  }
  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.date = new Date(this.year, this.month, today.getDate()).toLocaleDateString();
  }
  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }
  getDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    let currentDate = new Date();
    if (selectedDate <= currentDate) {
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
    this.date = selectedDate.toLocaleDateString('fr-FR');
    this.showDatepicker = true;
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;
}
