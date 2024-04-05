import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    constructor(private http:HttpClient) { }
  
    getToken(token:string): Observable<any>{
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get(environment.api + '/user/token', { headers }) as Observable<any>;
    }
    getUser():Observable<User[]>{
      return this.http.get<User[]>(environment.api+'/user')
    }
    getDocteur():Observable<User[]>{
      return this.http.get<User[]>(environment.api+'/user/docteur')
    }
    getUserById(id:number){
      return this.http.get<User[]>(`${environment.api}/user/id/${id}`);
    }
    AddUser(user:any){
      return this.http.post<User>(environment.api + '/user',user)
    }
    updateUser(ID: number, user: User): Observable<any> {
      return this.http.patch<User>(environment.api + '/user/' + JSON.stringify(ID), user);
    }
    deleteUser(id:number){
      return  this.http.delete(environment.api+'/user/' + id)
    }
  }