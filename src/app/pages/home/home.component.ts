import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../shared/interfaces/icategory';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchPipe,FormsModule,RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
 


  favoriteItems: { [key: string]: boolean } = {};
 

  hamada:string = ""


  products: IProduct[] = [];
  categories: ICategory[] = [];

 

   

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
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

  getCategoryData():void{
    
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories = res.data;   
        
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
      error:(err)=>{
        console.log(err)
      }
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
