import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IVideoContent } from '../../models/video-content.interface';
import { CartServiceService } from '../../services/cart.service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  items: IVideoContent[] = [];
  totalAmount: number = 0;
  itemPrice: number = 0;

  constructor(private cartService: CartServiceService,  private router: Router) {
    // this.itemPrice = this.cartService.getTotalPrice();
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.itemPrice = this.cartService.getTotalPrice();
  }


  removeFromCart(movie: IVideoContent): void {
    this.cartService.removeItem(movie);
    this.items = this.cartService.getItems(); // Refresh the items list
    // this.calculateTotal();
    this.itemPrice = this.cartService.getTotalPrice();
  }

  btn:any=-1;

  checkout(): void {
    // const confirmation = confirm(`The total amount is $${this.itemPrice}. Do you want to proceed to payment?`);
    Swal.fire({
      text: `The total amount is $${this.itemPrice}. Do you want to proceed to payment?`,
      icon: 'success',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/payment']);
      }
    });
  }
}

