import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataloaded=false;

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["categoryId"])
      {
        this.getProductsByCategory(params["categoryId"])
      }
      else{
        this.getProducts()
      }
    })
    }
  getProducts()
  {
    this.productService.getProducts().subscribe(response =>{
      this.products = response;
      this.dataloaded =true;
    })
  }
  getProductsByCategory(categordId:number)
  {
    this.productService.getProductsByCategory(categordId).subscribe(response =>{
      this.products = response;
      this.dataloaded =true;
    })
  }
  
}
