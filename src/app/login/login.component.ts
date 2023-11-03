import { Component, Renderer2 } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  error:string='';
  constructor(private renderer: Renderer2,private router: Router,private _AuthService:AuthService, private _Router:Router,private _CartService:CartService) { }

  loginForm =new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
  })
  submitRegistrationForm(loginForm:FormGroup)
  {
    this._AuthService.login(loginForm.value).subscribe((response)=>{
      if(response.message =='success')
      {
        this._CartService.hello()
        localStorage.setItem('userToken',response.token)
        this._AuthService.saveCurrentUser(); 
        this._Router.navigate(['/home'])
        
        // Good Registration
      }
      else
      {
        this.error=response.message
        // Bad Registration
      }
    })
  }
  showcloud()
    {
      const cloudDiv = document.querySelector('.cloud');
      const welcomeDiv = document.querySelector('.welcome');
       if (cloudDiv) {
         this.renderer.setStyle(cloudDiv, 'display', 'block');
       }
       if (welcomeDiv) {
         this.renderer.setStyle(welcomeDiv, 'display', 'block');
       }
    }
}