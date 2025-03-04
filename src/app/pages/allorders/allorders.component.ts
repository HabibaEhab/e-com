import { Component,inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllordersService } from '../../core/services/allorders/allorders.service';
import { IOrder } from '../../shared/interfaces/iorder';
import { jwtDecode } from 'jwt-decode'
import {CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  private readonly allordersService = inject(AllordersService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  userOrder:any
  orders: IOrder[] = [];

  
  
  
  ngOnInit(): void {
   

    if(isPlatformBrowser(this.pLATFORM_ID)){
          if(localStorage.getItem('token') !== null){
            this.getOrderData();  
            this.getOrder(this.userOrder.id) 
      
          }
    
        }
      
  }

  getOrderData():void{
    this.userOrder = jwtDecode(localStorage.getItem("token") !)
    console.log(this.userOrder)

  }

  getOrder(id:string):void{
    this.allordersService.getUserOrders(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.orders = res;
        
      },

      error:(err)=>{
        console.log(err);
      },
    })


  }


}
