import { Component, OnInit,inject, } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IList } from '../../shared/interfaces/ilist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  
    listDetails:IList [] = [] ;
  
  
    ngOnInit(): void {
  
      this.getlistData();
        
    }
  
    getlistData():void{
      this.wishlistService.getLoggedUserWishlist().subscribe({
  
        next:(res)=>{
          console.log(res.data) // products[ {}, {},] 
          this.listDetails = res.data
  
        },
        error:(err)=>{
          console.log(err)
        }
  
      })
  
    }
  
    removeListItem(id:string):void{
  
      this.wishlistService.removeSpecificWishlistItem(id).subscribe({
  
        next:(res)=>{
          console.log(res) 
          this.listDetails = this.listDetails.filter(item => item.id !== id);

          const savedFavorites = localStorage.getItem('favorites');
          if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites);
            delete favorites[id]; 
            localStorage.setItem('favorites', JSON.stringify(favorites));
          }
  
        },
        error:(err)=>{
          console.log(err)
        }
  
      })
  
    }


    addToCart(id:string):void{
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'success'){
            this.toastrService.success(res.message, 'FreshCart')
            this.cartService.cartNumber.set(res.numOfCartItems);
            console.log(this.cartService.cartNumber());
          }
  
        },
        error:(err)=>{
          console.log(err)
        }
      })
  
    }
  
  

}
