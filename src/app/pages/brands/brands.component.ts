import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly brandsService = inject(BrandsService);
  
    
    brands: IBrand[] = [];
    selectedBrand: IBrand | null = null;
  
  
  
    ngOnInit(): void {
      this.getBrandData();
        
    }
  
    getBrandData():void{
      this.brandsService.getAllBrands().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.brands = res.data;
          
        },
  
        error:(err)=>{
          console.log(err);
        },
      })
  
  
    }

    getSpecificBrandData(id:string):void{
      this.brandsService.getSpecificBrand(id).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.selectedBrand = res.data;
          
        },
  
        error:(err)=>{
          console.log(err);
        },
      })
  
  
    }
  
    closeModal(): void {
      this.selectedBrand = null;
    }



}
