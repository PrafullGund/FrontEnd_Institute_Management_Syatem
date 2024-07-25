import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: DefaultLayoutComponent, data: {
      title: 'Home'
    },
    children: [
      { path: 'admission', loadChildren: () => import('./views/admissions/routes').then((m) => m.routes) },
      { path: 'activities', loadChildren: () => import('./views/activities/routes').then((m) => m.routes) },
      { path: 'course', loadChildren: () => import('./views/course/routes').then((m) => m.routes) },
      { path: 'dashboard', loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes) },
      { path: 'enquiries', loadChildren: () => import('./views/enquiries/routes').then((m) => m.routes) },
      { path: 'features', loadChildren: () => import('./views/features/routes').then((m) => m.routes) },
      { path: 'fee-payment', loadChildren: () => import('./views/fee-payment/routes').then((m) => m.routes) },
      { path: 'role', loadChildren: () => import('./views/role/routes').then((m) => m.routes) },
      { path: 'subject', loadChildren: () => import('./views/subject/routes').then((m) => m.routes) },
      { path: 'syllabus', loadChildren: () => import('./views/syllabus/route').then((m) => m.routes) },
      { path: 'timetable', loadChildren: () => import('./views/timetable/routes').then((m) => m.routes) },
      { path: 'user', loadChildren: () => import('./views/user/routes').then((m) => m.routes) },
      { path: 'widgets', loadChildren: () => import('./views/widgets/routes').then((m) => m.routes) }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
