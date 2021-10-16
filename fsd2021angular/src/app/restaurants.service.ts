import { Injectable } from '@angular/core';
import { Restaurant } from './model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  restaurants: Restaurant[] = [
    new Restaurant("McDonalds", 30, 4.3, "burger, Indian, Continental"),
    new Restaurant("Table By Basant", 40, 4.5, "Indian, Chinese, Continental"),
    new Restaurant("Subway", 35, 4.0, "Sandwich, Salad"),
    new Restaurant("Natural", 25, 4.5, "Chinese, Indian"),
  ];

  constructor() {}
  getRestaurants(){
    return this.restaurants;
  }
}
