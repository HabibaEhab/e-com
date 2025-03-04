import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {

   constructor( private httpClinet:HttpClient ) { }
    
      
    
      getUserOrders(id:string) : Observable <any>
      {
        return this.httpClinet.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
      }


}
