import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(dishId: string): Promise<Dish> {
    return Promise.resolve(DISHES.find(({id}) => (id === dishId)));
  }

  getFeatureDish(): Promise <Dish> {
    return Promise.resolve(DISHES.find(dish => dish.featured));
  }
}
