import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cartitem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]); // 🔹 observable yapı

  cart$ = this.cartSubject.asObservable(); // dışarıya observable olarak veriyoruz

  constructor() {
    this.loadCart();
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(i => i.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(i => i.product.productId !== product.productId);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.cartSubject.next(this.cartItems);
  }

  list(): CartItem[] {
    return this.cartItems;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems); // 🔹 değişiklikleri yayınla
  }

  private loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.cartSubject.next(this.cartItems);
    }
  }
}
