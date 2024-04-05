import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiement } from './paiement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private httpClient:HttpClient) { }

  AddPaiementt(paiement:any):Observable<Paiement[]> {
    return this.httpClient.post<Paiement>(environment.api +'/Paiement',paiement) as Observable<Paiement[]>
      }
}
