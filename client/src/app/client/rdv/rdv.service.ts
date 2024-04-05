import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rdv } from './rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  constructor(private httpClient: HttpClient) { }
  AddRdv(rdv: any): Observable<Rdv[]> {
    return this.httpClient.post<Rdv>(environment.api + '/rdv/create', rdv) as Observable<Rdv[]>
  }
  getRdv():Observable<Rdv[]> {
    return this.httpClient.get<Rdv>(environment.api +'/rdv') as Observable<Rdv[]>
  }
  getRdvByMat(id: any): Observable<Rdv[]> {
    return this.httpClient.get<Rdv[]>(`${environment.api}/rdv/patient/${id}`);
  }
  getRdvById(id: any): Observable<Rdv[]> {
    return this.httpClient.get<Rdv[]>(environment.api + '/rdv/rev/' + JSON.stringify(id)) as Observable<[Rdv]>
  }
  confirmer(id: any) {
    return this.httpClient.post(`${environment.api}/rdv/confirmer/${id}`, {});
  }
  delete(id: any) {
    return this.httpClient.delete(`${environment.api}/rdv/${id}`);
  }
  getRdvPerDay(){
    return this.httpClient.get<Rdv[]>(environment.api + '/rdv/PerWeek') as Observable<Rdv[]>
  }
}
