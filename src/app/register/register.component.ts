import { Component, Renderer2 } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  error:string='';
  constructor(private renderer: Renderer2, private _AuthService:AuthService, private _Router:Router) { }
  registerForm =new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    phone:new FormControl(null,[Validators.required]),
  })
 submitRegistrationForm(registerForm:FormGroup)
 {
   this._AuthService.register(registerForm.value).subscribe((response)=>{
      if(response.message =='success')
      {
        this._Router.navigate(['/login'])
        // Good Registration
      }
      else
      {
        this.error=response.message
        // Bad Registration
      }
   })
 }
}
