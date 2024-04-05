import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient:HttpClient) { }
  getService():Observable<Service[]>{
    return this.httpClient.get<Service[]>(environment.api + '/service') as Observable<[Service]>
  }
  getServiceById(id:any):Observable<Service[]>{
    return this.httpClient.get<Service[]>(environment.api + '/service/' + JSON.stringify(id)) as Observable<[Service]>
  }
  updateService(id:any,service:any){
    return this.httpClient.patch<Service[]>(environment.api + '/service/' + id,service) as Observable<[Service]>
  }
  
  deleteService(id:any){
    return  this.httpClient.delete(environment.api+'/service/' + id)
  }
  addService(service:any){
    return this.httpClient.post<Service[]>(environment.api+ '/service',service) as Observable<[Service]>
  }
}
