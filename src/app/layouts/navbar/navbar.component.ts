import { Component, computed, inject, input, Input, InputSignal, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  @Input() isLogin:boolean=true;

  countCart:Signal <number> = computed( ()=> this.cartService.cartNumber() )

  ngOnInit(): void {

    if(isPlatformBrowser(this.pLATFORM_ID)){
      if(localStorage.getItem('token') !== null){
        this.cartService.getLoggedUserCart().subscribe({
          next:(res)=>{
    
            this.cartService.cartNumber.set(res.numOfCartItems)
    
          }
        })
       
  
      }

    }

   


    // this.cartService.getLoggedUserCart().subscribe({
    //   next:(res)=>{

    //     this.cartService.cartNumber.set(res.numOfCartItems)

    //   }
    // })
    
      
  }

  logout():void{
    this.authService.logoutUser();
  }


}
