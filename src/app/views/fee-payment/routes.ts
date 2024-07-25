import { Routes } from '@angular/router';
import { FeePaymentComponent } from './fee-payment.component';

export const routes: Routes = [
  {
    path: '', 
    component: FeePaymentComponent, 
    data: { title: 'fee-payment' }
  }
];
