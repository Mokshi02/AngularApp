import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  /*
  restaurants: Restaurant[] = [
    new Restaurant("McDonalds", 30, 4.3, "burger, Indian, Continantal"),
    new Restaurant("Table By Basant", 40, 4.5, "Indian, Chinesse, Continantal"),
  ];
  */
  restaurants = this.service.getRestaurants();

  constructor(private service: RestaurantsService) { }

  ngOnInit(): void {
  }

  addRestaurant(name: string, timeToDeliver: string, ratings: string, categories: string){
    this.restaurants.push(new Restaurant(name, Number(timeToDeliver), Number(ratings), categories))
  }
}
