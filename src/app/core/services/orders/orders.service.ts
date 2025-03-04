import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  constructor(private httpClient:HttpClient) { }


  checkoutPayment(id:string , data:object):Observable <any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        "shippingAddress": data
            
      }
    )
  }


}
