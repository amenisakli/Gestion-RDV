import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }
  AddPatient(patient: any): Observable<Patient[]> {
    return this.httpClient.post<Patient>(environment.api + '/patient', patient) as Observable<Patient[]>
  }

  getPatientBuId(id: any): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${environment.api}/patient/${id}`);
  }
  getPatientByMat(id: any): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${environment.api}/patient/mat/${id}`);
  }
  editPatient(ID: number, patient: any): Observable<any> {
    return this.httpClient.patch<Patient>(environment.api + '/patient/' + JSON.stringify(ID), patient);
  }
  getPatient(){
    return this.httpClient.get<Patient>(environment.api + '/patient') as Observable<Patient[]>
  }
  getPatientPerDay(){
    return this.httpClient.get<Patient[]>(environment.api + '/patient/PerWeek') as Observable<Patient[]>
  }
  deletePatient(id:number):Observable<Patient>{
    return this.httpClient.delete<Patient>(environment.api + '/patient/'+ id)
  }
}
