import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { GetImageService } from '../../services/get-image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataloaded = false;
  filterText = "";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private productImageService: GetImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
      this.dataloaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response;
      this.dataloaded = true;
    });
  }

  addToCart(product: Product) {
    if (product.unitsInStock > 0) {
      this.toastrService.success("Sepete Eklendi", product.productName);
      this.cartService.addToCart(product);
    } else {
      this.toastrService.error("Hata", "Bu ürün sepete eklenemez");
    }
    
  }

  getProductImages(productName: string): string {
    return this.productImageService.getProductImage(productName);
  }
}
