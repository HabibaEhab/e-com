import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

 private readonly activatedRoute = inject(ActivatedRoute);
 private readonly productsService = inject(ProductsService);
 private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
 

 productId:any;
 productDetails: IProduct  | null = null;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.productId = res.get("id");
        console.log(this.productId);

        this.productsService.getSpecificProduct(this.productId).subscribe({
          next:(res)=>{
            this.productDetails = res.data;

          },
          error:(err)=>{
            console.log(err);

          }
        })

      },
      error:(err)=>{
        console.log(err);

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
