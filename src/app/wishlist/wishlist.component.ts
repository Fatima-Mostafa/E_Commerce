import { Component,Renderer2} from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  wishlist:any=null;
  constructor(private renderer: Renderer2,private _WishlistService:WishlistService, private _CartService:CartService,private _ToastrService: ToastrService){}

  AddtoCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
     next:(response)=> {
      this._CartService.numOfCartItems?.next(response.numOfCartItems)
      console.log(response)
      this._ToastrService.success('Product Added to your Cart Successfuly💗')},
     error:(err)=> console.log(err)
    })
   }

   removeItem(productId:string){
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next:(response) =>{
        this.wishlist=response.data
        console.log(this.wishlist)
      },
      error:(err)=> console.log(err)
    })
      this._WishlistService.getLoggedWishlist().subscribe({
        next:(response)=> {
          this.wishlist=response.data
          this._ToastrService.success('Product Removed from your Wishlist Successfuly🖤')
        }
    })
   }

  ngOnInit():void{
    this._WishlistService.getLoggedWishlist().subscribe({
      next:(response)=>{
        this.wishlist=response.data
        const messageDiv = document.querySelector('.message');
        if (messageDiv && this.wishlist.length==0){
          this.renderer.setStyle(messageDiv, 'display', 'block');
          console.log('Empty')
        }
        else{
          console.log(this.wishlist)
        }
      },
      error:(err)=>console.log(err)
    })
  }
}
 