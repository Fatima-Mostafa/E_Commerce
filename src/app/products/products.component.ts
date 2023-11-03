import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products:any[]=[];
  pageSize:number=0;
  currentpage:number=0;
  total:number=0;
  num:Number=1;
  id:string='';

  constructor(private _ProductsService:ProductsService,private _CartService:CartService,private _WishlistService:WishlistService,private _ToastrService: ToastrService){
    _ProductsService.getData(`products?page=${this.num}`).subscribe((response)=>{
      this.products=response.data
      this.pageSize=response.metadata.limit
      this.currentpage=response.metadata.currentPage
      this.total=response.results
    })
  }
  AddtoCart(productId:string){
   this._CartService.addToCart(productId).subscribe({
    next:(response)=>{ 
      console.log(response)
      this._CartService.numOfCartItems?.next(response.numOfCartItems)
      this._ToastrService.success('Product Added to your Cart Successfuly💗');
    },
    error:(err)=> console.log(err)
   })
  }

  AddToWishlist(productId:string){
    this._WishlistService.AddtoWishlist(productId).subscribe({
      next:(response)=> {
        console.log(response)
        this._ToastrService.success('Product Added to your Wishlist Successfuly💗')
      },
      error:(err)=>console.log(err)
    })
  }

  pageChanged(event:any){
    this._ProductsService.getData(`products?page=${event}`).subscribe((response)=>{
      this.products=response.data
      this.pageSize=response.metadata.limit
      this.currentpage=response.metadata.currentPage
      this.total=response.results
    })
  }
}
