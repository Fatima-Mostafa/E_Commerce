import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Brands:any[]=[];
  id:string='';
  num:number=0;
  pageSize:number=0;
  currentpage:number=0;
  total:number=0;

  constructor(private _ProductsService:ProductsService,private _CartService:CartService,private _WishlistService:WishlistService){
    _ProductsService.getData(`brands?page=${this.num}`).subscribe((response)=>{
      this.Brands=response.data;
      this.pageSize=response.metadata.limit
      this.currentpage=response.metadata.currentPage
      this.total=response.results
    })
  }
  AddtoCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
     next:(response)=> {console.log(response)
      this._CartService.numOfCartItems.next(response.numOfCartItems)
    },
     error:(err)=> console.log(err)
    })
   }
   AddToWishlist(productId:string){
    this._WishlistService.AddtoWishlist(productId).subscribe({
      next:(response)=> console.log(response),
      error:(err)=>console.log(err)
    })
  }

  pageChanged(event:any){
    this._ProductsService.getData(`brands?page=${event}`).subscribe((response)=>{
      this.Brands=response.data
      this.pageSize=response.metadata.limit
      this.currentpage=response.metadata.currentPage
      this.total=response.results
    })
  }
}
