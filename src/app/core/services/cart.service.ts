import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient : HttpClient) { }

  cartNumber:BehaviorSubject<number>= new BehaviorSubject(0)

  myHeaders:any= {
    token:localStorage.getItem('userToken')
  }

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` , 
      {
        "productId" : id
      },
      {
        headers: this.myHeaders
      }
    )

  }

  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, 
      {
        headers: this.myHeaders
      }
    )
  }


  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, 
      {
        headers: this.myHeaders
      }
    )

  }



  updateProductQuantity(id:string , counter:number):Observable<any>{

    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}` , 
      {
        "count" : counter
      },
      {
        headers:this.myHeaders 
      }
    )

  }



  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, 
      {
        headers : this.myHeaders

      }
      )
  }





}
