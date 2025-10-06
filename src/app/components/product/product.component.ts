import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { GetImageService } from '../../services/get-image.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataloaded = false;
  filterText = "";
  productAddForm!: FormGroup;
  selectedProduct!: Product | null;
  isManagerPage: boolean = false;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private productImageService: GetImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      } else {
        this.getProducts();
        this.productService.getProducts().subscribe(data => {
        this.products = data;
    });
      }
    });
    this.isManagerPage = this.router.url.includes('/products/manager');
    

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
  updateProduct(product: Product) {
    console.log("Güncelle:", product);
    // güncelleme işlemleri
  }

    deleteProduct(product: Product) {
    if (confirm(`${product.productName} adlı ürünü silmek istiyor musun?`)) {
      this.productService.deleteProduct(product).subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          // local array güncelle
          this.products = this.products.filter(p => p !== product);
        },
        error: (error) => {
          
          this.toastrService.error('Silme işlemi başarısız', error.message);
        }
      });
    }
  }

    onSelectProduct(product: Product) {
    this.productService.selectProduct(product);
  }

}
