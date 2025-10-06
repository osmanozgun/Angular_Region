import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  
})

export class ProductAddComponent implements OnInit {

  selectedProduct: Product | null = null;
  products:Product
  constructor(private formBuilder:FormBuilder,
        private productService:ProductService,
        private toastrService:ToastrService,
        private router:Router) { }

  productAddForm:FormGroup;
  ngOnInit(): void {
    this.createProductAddForm();
    this.productAddForm = this.formBuilder.group({
      productName: [''],
      categoryId: [''],
      unitsInStock: [''],
      unitPrice: ['']
    });
    this.productService.selectedProduct$.subscribe(product => {
    this.selectedProduct = product; // seçili ürünü sakla
    if (product) {
      this.productAddForm.patchValue({
        productName: product.productName,
        categoryId: product.categoryId,
        unitsInStock: product.unitsInStock,
        unitPrice: product.unitPrice
      });
    }
  });
    // Service üzerinden gelen ürüne abone ol
    
  }
  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productId:[""],
      productName:["",Validators.required],
      unitPrice:["",Validators.required],   
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }
  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(response => {
        this.toastrService.success("Ürün Eklendi");
      }, responseError => {
        if (responseError.error.Errors && responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
          }
        } else if (responseError.error && responseError.error.message) {
          this.toastrService.error(responseError.error.message, "Hata");
        } else {
          this.toastrService.error("Bilinmeyen bir hata oluştu", "Hata");
        }
      });
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat");
    }
  }
  updateProduct() {
    if (this.productAddForm.valid && this.selectedProduct) {
      // 👇 API'nin istediği JSON formatına uygun nesne oluştur
      const updatedProduct = {
        productId: this.selectedProduct.productId, // Dikkat: büyük harfli key
        categoryId: this.productAddForm.value.categoryId,
        productName: this.productAddForm.value.productName,
        unitsInStock: this.productAddForm.value.unitsInStock,
        unitPrice: this.productAddForm.value.unitPrice
      };

      if (confirm(`${updatedProduct.productName} adlı ürünü güncellemek istiyor musun?`)) {
        this.productService.updateProduct(updatedProduct).subscribe({
          next: (response: any) => {
            this.toastrService.success(response.message, 'Başarılı');
          },
          error: (error) => {
            console.error(error);
            this.toastrService.error('Güncelleme işlemi başarısız', error.message);
          }
        });
      }
    } else {
      this.toastrService.warning('Lütfen bir ürün seçin ve formu eksiksiz doldurun.');
    }
  }


}
