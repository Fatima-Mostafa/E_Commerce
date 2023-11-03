import { Component } from '@angular/core';
import { FormControl,FormGroup} from '@angular/forms';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  constructor(private _CartService:CartService){}
  shippingAddress =new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })

  navigate(url:string){
   window.location.href=url;
  }
  handelsubmit(shippingAddress:FormGroup){
    console.log(shippingAddress.value)
    this._CartService.onlinePayment(shippingAddress.value,"6536ac264e687b1ae787ea79").subscribe({
      next:(response:any)=>{
        this.navigate(response.session.url)
        console.log(response.session.url)
      },
      error:(err)=> console.log(err)
    })
  }
}
