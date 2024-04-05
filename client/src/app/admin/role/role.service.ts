import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "./role";


@Injectable({
    providedIn: 'root'
  })
  export class RoleService {
  
    constructor(private http:HttpClient) { }
  

    getRole():Observable<Role[]>{
      return this.http.get<Role[]>(environment.api+'/role')
    }
    addRole(role:Role):Observable<Role>{
      return this.http.post<Role>(environment.api + '/role' ,role)
    }
    updateRole(role:Role,id:number):Observable<Role>{
      return this.http.patch<Role>(environment.api + '/role/'+ id ,role)
    }
    getRoleById(id:number):Observable<Role>{
      return this.http.get<Role>(environment.api + '/role/'+ id)
    }
    deleteRole(id:number):Observable<Role>{
      return this.http.delete<Role>(environment.api + '/role/'+ id)
    }
  }