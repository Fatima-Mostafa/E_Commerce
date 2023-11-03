import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  islogin:boolean=false;
  cartNumber:number=0;
  constructor(private _AuthService:AuthService,private _CartService:CartService,private _ToastrService:ToastrService){
    this._CartService.hello()
  }

  islogout(){
    this._AuthService.logout();
    this._ToastrService.success('See you soon🖐')
  }
  
  ngOnInit():void{
    this._CartService.numOfCartItems.subscribe({
      next:(x)=> this.cartNumber=x,
      error:(err)=>console.log(err)
    })
    this._AuthService.currentUser.subscribe(()=>{
      if(this._AuthService.currentUser.getValue() !=null)
      {
        this.islogin=true;
      }
      else{
        this.islogin=false;
      }
    })
  }
}
