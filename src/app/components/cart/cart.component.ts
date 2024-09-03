import { Component,inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Console, count } from 'console';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  cartDetails:Icart={} as Icart


  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        
       
        this.cartDetails=res.data
        this._NgxSpinnerService.hide()
        
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }

  removeItem(id:string):void{
    
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        
        this.cartDetails=res.data
        this._CartService.cartNumber.next(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  updateCount(id:string , counter:number):void{

    this._CartService.updateProductQuantity(id,counter).subscribe({
      next:(res)=>{
        
        this.cartDetails=res.data
        this._ToastrService.success( 'Product Updated Successfully' , 'FreshCart')
        
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


  clearItems():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=="success"){
          this.cartDetails={} as Icart
          this._CartService.cartNumber.next(0)
        }
        
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
