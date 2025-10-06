import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { GetImageService } from '../../services/get-image.service';
import { CartItem } from '../../models/cartitem';
import { Toast, ToastrService } from 'ngx-toastr';
import { isReactive } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrl: './sepet.component.css'
})
export class SepetComponent {
     firstName = localStorage.getItem('firstName') || '';
     lastName:string = localStorage.getItem('lastName') || '';
  cartItems: CartItem[] = [];

  orderdata = {
    name: this.firstName + ' ' + this.lastName,
    adres: '',
    city: '',
    code: ''
  };

  constructor(
    private cartService: CartService,
    private productImageService: GetImageService,
    private toastr:ToastrService
  ) {}
  
  ngOnInit(): void {
    this.cartItems = this.cartService.list();
    
  }

  increaseQuantity(item: CartItem) {
    item.quantity += 1;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeFromCart(item);
    }
  }
  removeFromCart(cartItem: CartItem) {
  this.cartService.removeFromCart(cartItem.product);
  this.toastr.error(`${cartItem.product.productName} sepetten silindi`);
  this.cartItems = this.cartService.list();
}


  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.unitPrice * item.quantity, 0);
  }

  getCartItemImage(productName: string): string {
    return this.productImageService.getProductImage(productName);
  }

  submitAddress() {
    if (this.cartItems.length === 0) return;

    console.log('Adres Bilgileri:', this.orderdata);
    console.log('Sepet:', this.cartItems);
    alert('Siparişiniz alındı!');
  }
}