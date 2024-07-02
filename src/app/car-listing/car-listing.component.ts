import { Component, Input } from '@angular/core';
import { Car } from '../car';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-listing',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="car-listing">
      <h2 class="car-listing-name">{{ car.name }}</h2>
      <p class="car-listing-description">{{ car.description }}</p>
      <a [routerLink]="['car', car.id]" class="car-listing-read-more"
        >Learn more</a
      >
    </section>
  `,
  styleUrl: './car-listing.component.css',
})
export class CarListingComponent {
  @Input() car!: Car;
}
