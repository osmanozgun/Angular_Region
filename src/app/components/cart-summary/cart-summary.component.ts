import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent implements OnInit {
  cartItems:CartItem[]=[];
  
  constructor(private cartService:CartService, private toastrService:ToastrService) { } 

  
  ngOnInit(): void { 
      this.getCart();
      
    }
  
  getCart() {
    this.cartItems = this.cartService.list();
  }
  removeFromCart(cartItem:CartItem) {
     this.cartService.removeFormCart(cartItem.product);
     this.toastrService.error(cartItem.product.productName+" sepetten silindi");
  }

}
