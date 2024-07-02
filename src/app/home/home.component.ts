import { Component, inject } from '@angular/core';
import { CarListingComponent } from '../car-listing/car-listing.component';
import { Car } from '../car';
import { CommonModule } from '@angular/common';
import { CarService } from '../car.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarListingComponent],
  template: `
    <section>
      <section class="search container">
        <input type="text" placeholder="Search for cars..." #filter />
        <button (click)="filterResults(filter.value)">Search</button>
      </section>
      <section class="search-string container" *ngIf="filter.value">
        You searched for {{ filter.value }}
      </section>
      <div class="loader" *ngIf="filteredCarList.length === 0"></div>
      <section class="results container" *ngIf="filteredCarList.length !== 0">
        <app-car-listing
          *ngFor="let carListing of filteredCarList"
          [car]="carListing"
        ></app-car-listing>
      </section>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  carList: Car[] = [];
  carService: CarService = inject(CarService);
  snackbarService: SnackbarService = inject(SnackbarService);
  filteredCarList: Car[] = [];

  constructor() {
    this.carService
      .getAllCars()
      .then((carList: Car[]) => {
        this.carList = carList;
        this.filteredCarList = carList;
      })
      .catch((e) => {
        this.snackbarService.setErrorMessage(
          'Error: Could not fetch cars from server'
        );
      });
  }

  filterResults(filterValue: String) {
    if (!filterValue) this.filteredCarList = this.carList;

    this.filteredCarList = this.carList.filter((car) =>
      car?.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}
