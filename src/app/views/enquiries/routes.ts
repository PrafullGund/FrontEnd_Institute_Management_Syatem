import { Routes } from '@angular/router';
import { EnquiriesComponent } from './enquiries.component';

export const routes: Routes = [
    { path: '', component: EnquiriesComponent, data: { title: 'Enquiries' } }
]