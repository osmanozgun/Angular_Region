import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  apiURL = 'https://localhost:44388/api/';
  constructor(private httpClient: HttpClient) { }
  
  getProducts():Observable<Product[]> {
    let path = this.apiURL +"products/getall"
    return this.httpClient.get<Product[]>(path)
    };
  getProductsByCategory(categoryId:number):Observable<Product[]> {
    let path2 = this.apiURL +"products/getbycategory?categoryId="+categoryId
    return this.httpClient.get<Product[]>(path2)
    };  
}

