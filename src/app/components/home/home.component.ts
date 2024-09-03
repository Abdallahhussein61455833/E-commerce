import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink ,TitleCasePipe,CurrencyPipe,TermtextPipe, SearchPipe, FormsModule , NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {

  private readonly _ProductsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  text:string=""
  hearticon:boolean=false

  ProductList:Iproduct[]=[]
  categoriesList:Icategory[]=[]
  getAllProductsSub!:Subscription
  customOptionscat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: true, 
    navSpeed: 700,
    navText: ['Prev', 'Next'],
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
    nav: true
  }


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false, 
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        
        this.categoriesList=res.data
        this._NgxSpinnerService.hide()


      },
      error:(err)=>{
        console.log(err) 
      }

    })

   this.getAllProductsSub= this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        
        this.ProductList=res.data

      },
      error:(err)=>{
        console.log(err)
      }
    })
   
    
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe()
    
  }

  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.message , 'FreshCart')
        this._CartService.cartNumber.next(res.numOfCartItems)
      
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


  addWishList(id:string):void{
    this._WishlistService.addToWishList(id).subscribe({
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
