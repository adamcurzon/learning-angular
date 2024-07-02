import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarDetailsComponent } from './car-details/car-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'My Cars Page',
  },
  {
    path: 'car/:id',
    component: CarDetailsComponent,
    title: 'My Car Page',
  },
];
