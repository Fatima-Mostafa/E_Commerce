import { Component ,Renderer2} from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartDetails:any=null;
  constructor(private renderer: Renderer2,private _CartService:CartService,private _ToastrService: ToastrService){}

  clearCart(){
    this._CartService.clearCart().subscribe({
      next:(response)=> {
        if(response.message =='success'){
          this._CartService.numOfCartItems?.next(0)
          this.cartDetails=null;
        }
        console.log(response)
      }
    })
  }

  updateItem(productId:string , count:number){
    this._CartService.updateCartItemQuantity(productId,count).subscribe({
      next:(response)=>{
        this._CartService.numOfCartItems?.next(response.numOfCartItems)
        this.cartDetails=response.data;
        console.log(response.data)
        this._ToastrService.success('Product Updated in your Cart Successfuly💗')
      },
      error:(err)=>console.log(err)
    })
  }


  removeItem(productId:string){
    this._CartService.removeCartItem(productId).subscribe({
      next:(response)=>{
        this._CartService.numOfCartItems?.next(0)
        this.cartDetails=response.data;
        console.log(response.data)
        this._ToastrService.success('Product Removed from your Cart Successfuly🖤')
      },
      error:(err)=>console.log(err)
    })
  }

  ngOnInit():void{
    this._CartService.getLoggedUserCart().subscribe({
      next:(response)=>{
        this._CartService.numOfCartItems?.next(response.numOfCartItems)
        this.cartDetails=response.data;
        console.log(response.data)
      },
      error:(err)=>console.log(err)
    })
  }
}
