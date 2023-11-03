import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems= new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient){}
  
  hello(){
    this.getLoggedUserCart().subscribe({
      next:(response?)=>
      {
        this.numOfCartItems?.next(response.numOfCartItems)
        console.log(response)
      },
      error:(err)=>console.log(err)
    })
  }
  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:productId})
  }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }
  removeCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
  updateCartItemQuantity(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      count:count
    })
  }

  onlinePayment(shippingAddress:any,cartId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress:shippingAddress
    })
  }
}
