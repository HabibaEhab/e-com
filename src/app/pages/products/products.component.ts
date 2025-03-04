import { Component,inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [SearchPipe,FormsModule,RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
   private readonly wishlistService = inject(WishlistService);

   favoriteItems: { [key: string]: boolean } = {};
  
    hamada:string = ""

  products: IProduct[] = [];

  ngOnInit(): void {
    this.getProductsData();
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favoriteItems = JSON.parse(savedFavorites);
    }
      
  }


  toggleFav(id:string) {
    // Toggle favorite status for the given product ID
    this.favoriteItems[id] = true;

    // Save updated favorite list to localStorage
    localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));

    
 }

 isFavorite(prodId: string): boolean {
   return this.favoriteItems[prodId] || false; 
 }


  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products = res.data;
      },

      error:(err)=>{
        console.log(err);
      },
    })

  }


  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(this.cartService.cartNumber())
        }

      },
      error:(err)=>[
        console.log(err)
      ]
    })

  }

  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'FreshCart')
        }

      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

}
