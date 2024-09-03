import { Product } from './../../core/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _Router =inject(Router)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _CartService = inject(CartService)



  wishListDetails :Iwishlist[]=[]

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._WishlistService.getWishListProducts().subscribe({
      next:(res)=>{
        
        
        this.wishListDetails=res.data 
    this._NgxSpinnerService.hide()

       
       
      },

      error:(err)=>{
        console.log(err)
      }
    })
    
  }

  

  removeWishList(id:string):void{

    this._WishlistService.deleteSpecificWishListItem(id).subscribe({
      next:(res)=>{
      this._ToastrService.success(res.message , 'FreshCart')
       console.log(res)
       location.reload()
        
        
        
      },
      error:(err)=>{
        console.log(err)
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
