import { Component, inject, OnInit } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CartProductComponent, NgIf], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] 
})
export class ProductComponent implements OnInit {
    api = inject(HttpClient);
    product_items: any[] = []; 
  
    constructor() {
      this.loadCartFromLocalStorage();
    }
  
    ngOnInit() {
      this.GetApiCrud();
    }
  
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart_items');
      if (savedCart) {
        const savedItems = JSON.parse(savedCart);
        this.product_items = this.product_items.map(item => {
          const savedItem = savedItems.find((s: any) => s.id === item.id);
          return savedItem ? { ...item, quantity: savedItem.quantity } : item;
        });
      }
    }
  
    AddhadleCart(updatedItem: any) {
      const index = this.product_items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.product_items[index].quantity = updatedItem.quantity;
      }
      this.saveCartToLocalStorage();
    }
  
    saveCartToLocalStorage() {
      const cartToSave = this.product_items.filter(item => item.quantity > 0);
      localStorage.setItem('cart_items', JSON.stringify(cartToSave));
    }
  
    delete() {
      this.product_items = this.product_items.map(item => ({ ...item, quantity: 0 }));
      localStorage.removeItem('cart_items');
    }
  
    get total_Price(): number {
      const total = this.product_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return total.toFixed(2);
    }

    get total_Qty(): number {
      return this.product_items.reduce((sum, item) => sum + item.quantity, 0);
    }
  
    GetApiCrud() {
      this.api.get('https://dummyjson.com/products').subscribe((result: any) => {
        this.product_items = result.products.map((p: any) => ({ ...p, quantity: 0 }));
  
        this.loadCartFromLocalStorage();
      });
    }

    alert() {
      Swal.fire({
        title: 'Cart Summary',
        html: `
          <p><b>Total Price:</b> $${this.total_Price}</p>
          <p><b>Total Qty:</b> ${this.total_Qty}</p>
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    
  }
