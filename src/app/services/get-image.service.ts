import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor() { }

  getProductImage(productName: string): string {
    const safeName = productName.replace(/[^a-zA-Z0-9]/g, '_');
    return `assets/images/${safeName}.jpg`;
  }
}
