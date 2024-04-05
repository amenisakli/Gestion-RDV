import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { PatientService } from 'src/app/client/patient/patient.service';
import { RdvService } from 'src/app/client/rdv/rdv.service';
import { ServiceService } from 'src/app/client/service/service.service';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lineChart: any;
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
  docteur : any 
  service : any
  patient : any
  rdv : any
  holidays: { date: number, month: number }[] = [
    { date: 1, month: 1 }, 
    { date: 20, month: 3 },
    { date: 9, month: 4 },
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
  constructor(private patientService: PatientService,private rdvService:RdvService,private userService:UserService,private servicesService:ServiceService) { }
  ngOnInit(): void {
    this.getPatient()
    this.getRdv()
    this.initDate();
    this.getNoOfDays();
    this.getTotalPatient()
    this.getDocteur()
    this.getTotalService()
    this.getTotalRdv()
  }
  getTotalRdv(){
    this.rdvService.getRdv().subscribe(data => {
      this.rdv = data.length
    })
  }
  getTotalService(){
    this.servicesService.getService().subscribe(data => {
      this.service = data.length
    })
  }
  getDocteur(){
    this.userService.getDocteur().subscribe(data =>{
      this.docteur = data.length      
    })
  }
  getTotalPatient(){
    this.patientService.getPatient().subscribe(data =>{
      this.patient = data.length      
    })
  }
  getPatient() {
    this.patientService.getPatientPerDay().subscribe((data: any[]) => {
      const days = data.map(item => item.day)
      const patientCountPerDay = data.map(item => item.count);
      this.lineChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: days,
          datasets: [{
            label: 'Nombre de patients par jour',
            data: patientCountPerDay,
            borderColor: 'rgb(22,22,255)', // Couleur du bord
            backgroundColor: 'rgba(204,204,255)', // Couleur du contenu (bleu avec une opacité de 20%)
            fill: true, // Remplir la zone sous la ligne
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                precision: 0,
              }
            }
          }
        }
      });
      
    });
  }
  getRdv() {
    this.rdvService.getRdvPerDay().subscribe((data: any[]) => {
      const days = data.map(item => item.day)
      const rdvCountPerDay = data.map(item => item.count);
      this.lineChart = new Chart('canvasRdv', {
        type: 'line',
        data: {
          labels: days,
          datasets: [{
            label: 'Nombre de rendez-vous par jour',
            data: rdvCountPerDay,
            borderColor: 'rgb(255,196,83)', 
            backgroundColor: 'rgb(255,239,207)',
            fill: true, 
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                precision: 0,
              }
            }
          }
        }
      });
      
    });
  }
  isHoliday(date: number, month: number): boolean {
    return this.holidays.some(holiday => holiday.date === date && holiday.month === month + 1);
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