import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { log } from 'console';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  
  detailsProduct:Iproduct|null=null

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idProduct = p.get('id');
        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next:(res)=>{
            
            this.detailsProduct=res.data
    this._NgxSpinnerService.hide()


          },
          error:(err)=>{
            console.log(err)
          }
        })


 


      }
    })
  }


  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.message , 'FreshCart')
      
      },
      error:(err)=>{
        console.log(err)
      }
    })


  }

}
