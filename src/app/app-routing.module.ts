import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[AuthGuard],component:HomeComponent,pathMatch:'full'},
  {path:'products',canActivate:[AuthGuard],component:ProductsComponent,pathMatch:'full'},
  {path:'productdetails/:id',canActivate:[AuthGuard],component:ProductdetailsComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'register',component:RegisterComponent,pathMatch:'full'},
  {path:'categories',canActivate:[AuthGuard],component:CategoriesComponent,pathMatch:'full'},
  {path:'cart',canActivate:[AuthGuard],component:CartComponent,pathMatch:'full'},
  {path:'wishlist',canActivate:[AuthGuard],component:WishlistComponent,pathMatch:'full'},
  {path:'checkout',canActivate:[AuthGuard],component:CheckoutComponent,pathMatch:'full'},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
