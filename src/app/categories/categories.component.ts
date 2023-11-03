import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories:any[]=[];
  constructor(_ProductsService:ProductsService){
    _ProductsService.getData('categories').subscribe((response)=>{
      this.categories=response.data;
    })
  }
}
