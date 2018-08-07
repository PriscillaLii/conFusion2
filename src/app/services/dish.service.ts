import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(10));
  }

  getDish(id: number): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(10));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(10));
  }

  getDishIds(): Observable<number[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }

  /*getDishes(): Promise<Dish[]> {
    return of(DISHES).pipe(delay(2000)).toPromise();
    /*return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
    /*return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }*/
}
