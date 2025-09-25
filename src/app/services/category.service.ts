import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  apiURL = 'https://localhost:44388/api/categories/getall';
  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURL)
    };
}

