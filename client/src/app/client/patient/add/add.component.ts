import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rdv } from 'src/app/client/rdv/rdv';
import { Patient } from '../patient';
import { Service } from 'src/app/client/service/service';
import { RdvService } from 'src/app/client/rdv/rdv.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/client/service/service.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule ,FormsModule, ReactiveFormsModule],
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
  DAYS = ['Dim', 'Lun ', 'Mar ', 'Mer ', 'Jeud ', 'Vend ', 'Sam'];
  showDatepicker = false;
  datepickerValue!: string;
  month!: number;
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  PatientForm = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    tel: new FormControl(),
    dossier: new FormControl(),
    numero: new FormControl()
  })
  RdvForm = new FormGroup({
    date: new FormControl(),
    serviceName: new FormControl()
  })
  rdv: Rdv[] | any
  patient: Patient[] | any

  id: any
  service: Service[] | any
  alertMat:boolean = false
  mat:any
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
showAlert:boolean = false
  constructor(private rdvService: RdvService,private patientService: PatientService, private route: ActivatedRoute, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.serviceService.getServiceById(this.id).subscribe(
        data => {
          this.service = data;          
        });
    });
    
  }
  isHoliday(date: number, month: number): boolean {
    return this.holidays.some(holiday => holiday.date === date && holiday.month === month + 1);
}

AjouterPatient() {
  this.patientService.AddPatient(this.PatientForm.value).subscribe(patientData => {
    this.patient = patientData;
    this.alertMat = true;
    this.mat = this.patient.matricule;
    const appointmentData = {
      serviceId: this.service.id,
      date: this.datepickerValue,
      patientId: this.patient.id
    };

    this.rdvService.AddRdv(appointmentData).subscribe(rdvData => {
      this.rdv = rdvData;
    }, error => {
      console.error("Error adding appointment:", error);
    });

  }, error => {
    console.error("Error adding patient:", error);
  });
}

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toLocaleDateString();
  }
  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

getDateValue(date: any) {
  let selectedDate = new Date(this.year, this.month, date);
  let currentDate = new Date(); 
  if (selectedDate < currentDate) {
    this.showAlert = true
  }
else{this.showAlert =false}
  this.datepickerValue = selectedDate.toLocaleDateString('fr-FR');
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
