import { CarService } from './../car.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="loader" *ngIf="!carListing"></div>
    <article class="container" *ngIf="carListing">
      <h1>{{ carListing.name }}</h1>
      <section class="car-listing-description">
        {{ carListing.description }}
      </section>

      <section>
        <h2>Enquire about this car</h2>
        <form
          [formGroup]="contactForm"
          (submit)="submitContactForm()"
          class="car-contact-form"
        >
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />

          <button type="submit">Send</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  carService: CarService = inject(CarService);
  snackbarService: SnackbarService = inject(SnackbarService);
  carListing: Car | undefined;
  contactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const carListingId = Number(this.route.snapshot.params['id']);
    this.carService
      .getCarById(carListingId)
      .then((carListing) => (this.carListing = carListing))
      .catch((e) => {
        this.snackbarService.setErrorMessage(
          'Error: Could not fetch car from server'
        );
      });
  }

  submitContactForm() {
    this.carService.submitContactForm(
      this.contactForm.value.firstName ?? '',
      this.contactForm.value.lastName ?? '',
      this.contactForm.value.email ?? ''
    );
  }
}
