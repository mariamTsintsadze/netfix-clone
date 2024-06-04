import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors } from '@angular/forms';
import { CartServiceService } from '../../services/cart.service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartServiceService,
    private router: Router
  ){
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', Validators.required],
      expirationDate: ['', [Validators.required, this.expirationDateValidator]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
    
    this.totalPrice = this.cartService.getTotalPrice();
  }

  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }

  get cardHolder() {
    return this.paymentForm.get('cardHolder');
  }

  get expirationDate() {
    return this.paymentForm.get('expirationDate');
  }

  get cvv() {
    return this.paymentForm.get('cvv');
  }

  expirationDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const today = new Date();
    const [month, year] = control.value.split('/').map((val: string) => parseInt(val, 10));
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
      return { invalidDate: true };
    }
    const expiryDate = new Date(year, month - 1, 1);
    if (expiryDate <= today) {
      return { expired: true };
    }
    return null;
  }
  goBack(): void {
    // this.location.back();
    this.router.navigate(['browse']);
  }

  submitPayment(): void {
    if (this.paymentForm.valid) {

        Swal.fire({
          text: `Do you want to proceed with the payment of $${this.totalPrice}?`,
          icon: 'success',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.cartService.clearCart();
            this.router.navigate(['/browse']);
          }
        });


    } else {
      this.paymentForm.markAllAsTouched();
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields.',
        icon: 'warning',
      })
    }
  }
}
