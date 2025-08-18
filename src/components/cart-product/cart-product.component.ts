import { Component, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-product',
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() item_product!: any;
  @Output() hadleAdd = new EventEmitter<any>();

  increaseQty() {
    this.item_product.quantity++;
    this.hadleAdd.emit(this.item_product);
  }

  decreaseQty() {
    if (this.item_product.quantity > 0) {
      this.item_product.quantity--;
      this.hadleAdd.emit(this.item_product);
    }
  }

  get totalPrice(): number {
    return this.item_product.price * this.item_product.quantity;
  }
} 
