import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products$ = new BehaviorSubject<Product[]>([]);
  
  // Seçili ürün
  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSource.asObservable();

  selectProduct(product: Product) {
    this.selectedProductSource.next(product);
  }

  // Örnek ürün listesi ve diğer metodlar
  
  apiURL = 'https://localhost:44388/api/';
  constructor(private httpClient: HttpClient) { }
  
  getProducts():Observable<Product[]> {
    let path = this.apiURL +"products/getall"
    return this.httpClient.get<Product[]>(path)
    };
  getProductsByCategory(categoryId:number):Observable<Product[]> {
    let path = this.apiURL +"products/getbycategory?categoryId="+categoryId
    return this.httpClient.get<Product[]>(path)
    }; 
  add(product:Product){
      return this.httpClient.post(this.apiURL+"products/add",product)
      
    }
  deleteProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.apiURL + "products/delete", product);
  }
  updateProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.apiURL + "products/update", product);
  }  
}

