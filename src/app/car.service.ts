import { Injectable } from '@angular/core';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  dbUrl = 'http://localhost:3000/cars';

  protected carListingList: Car[] = [];
  constructor() {}

  async getAllCars(): Promise<Car[]> {
    const data = await fetch(this.dbUrl);
    return (await data.json()) ?? [];
  }

  async getCarById(id: Number): Promise<Car | undefined> {
    const data = await fetch(`${this.dbUrl}/${id}`);
    return (await data.json()) ?? {};
  }

  submitContactForm(firstName: String, lastName: String, email: String) {
    console.log(firstName + '' + lastName + ' ' + email);
  }
}
