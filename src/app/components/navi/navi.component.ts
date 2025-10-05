import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../models/cartitem';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { GetImageService } from '../../services/get-image.service';
import { CategoryComponent } from '../category/category.component';
import { CategoryCleanService } from '../../services/categoryclean.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService,
    private productImageService: GetImageService,
    private categoryCleanService:CategoryCleanService) {}

  ngOnInit(): void {
    this.getCartItems();
  }
  navbarClean() {
  this.categoryCleanService.clean();
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserFullName(): string {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    return `${firstName} ${lastName}`;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');
    this.router.navigate(['/login']);
    this.toastr.info('Çıkış Yapıldı');
  }

  getCartItems() {
    this.cartItems = this.cartService.list();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFormCart(cartItem.product);
    this.toastr.error(cartItem.product.productName + ' sepetten silindi');
  }

  increaseQuantity(cartItem: any) {
    cartItem.quantity += 1;
  }

  decreaseQuantity(cartItem: any) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      this.removeFromCart(cartItem);
    }
  }

  getCartItemImage(productName: string): string {
    return this.productImageService.getProductImage(productName);
  }

  getTotalPrice(): number {
    let total = 0;
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach(item => {
        total += item.product.unitPrice * item.quantity;
      });
    }
    return total;
  }
}
