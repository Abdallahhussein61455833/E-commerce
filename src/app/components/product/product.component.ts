import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ FormsModule , CurrencyPipe, SearchPipe, TitleCasePipe,TermtextPipe ,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly _ProductsService=inject(ProductsService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)

  ProductList:Iproduct[]=[]
  text:string=""

  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
       

       
        
        this.ProductList=res.data
        this._NgxSpinnerService.hide()

      },
      error:(err)=>{
        console.log(err)
      }
    })


    
  }

}
