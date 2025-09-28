import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

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
    private toastrService:ToastrService,
    private cartService:CartService) {}

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
    if(product.productId!=1){
    this.toastrService.success("Sepete Eklendi",product.productName)
    this.cartService.addToCart(product);
    }
    else{
      this.toastrService.error("Hata","Bu ürün sepete eklenemez")
    }
  }
  
}
