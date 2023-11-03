import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient){
  }

  AddtoWishlist(productId:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
      productId:productId
    })
  } 
  getLoggedWishlist():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }

  removeFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
  }
  
}
