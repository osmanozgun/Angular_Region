import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products: Product[] = [];
  dataloaded=false;
  filterText="";

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) {}

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
  addToCart(product: Product) {
    this.toastrService.success("Sepet Eklendi",product.productName)
  }
  
}
