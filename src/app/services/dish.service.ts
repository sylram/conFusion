import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(dishId: string): Observable<Dish> {
    return of(DISHES.find(({ id }) => (id === dishId))).pipe(delay(2000));
  }

  getFeatureDish(): Observable<Dish> {
    return of(DISHES.find(dish => dish.featured)).pipe(delay(2000));
  }

  getDishIds(): Observable<String[] | any>{
    return of(DISHES.map(dish => dish.id));
  }
 
}
