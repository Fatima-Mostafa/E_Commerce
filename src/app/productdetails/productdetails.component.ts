import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent {
  id:string='';
  productDetails:any={}
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService){
    this.id = _ActivatedRoute.snapshot.params['id'];
    _ProductsService.getProductDetails(this.id).subscribe((productdata)=>{
      this.productDetails=productdata.data;
      console.log(this.productDetails)
    })
  }
}
