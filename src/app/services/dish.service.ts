// Injectable: allows us to define this injectable decorator to any class that we defined here
import { Injectable } from '@angular/core';

// if you want to emit only one value from your observable, you will use the of method
import { Observable, of } from 'rxjs';
// The delay operator enables us to delay the emitting of the item from our observable. 
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { Restangular } from 'ngx-restangular';

import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  //HTTP
  /*constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }*/

  //  make this service available for our component to make use
  constructor(private restangular: Restangular) { }

  //return in array of dishes
  getDishes(): Observable<Dish[]> {
    // restangular.all: would make HTTP request use baseURL+'/dishes' as root source and get all the data from it.
    // baseURL is defined in restConfig.ts
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    // restangular.one: would get information from baseURL+'/dishes'+'/:id'
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    // restangular.all('dishes') find all information from /dishes
    // getList({featured: true}: find all information of dishes where featured=true
    // pipe: use the dishes array provide by last step as a parameter to execute map
    // map: take dishes parameter, return the first one of this
    return this.restangular.all('dishes').getList({featured: true}).pipe(map(dishes => dishes[0]));
  }
 
  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
    // dish.id: param for map2, number; dish: return value of map2, number[]; 
    // dish: param for map1; dishes: return value of map1, number[], and looks same with dish;
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  // HTTP 
  /*getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getDish(id: number): Observable<Dish> {
      return this.http.get<Dish>(baseURL + 'dishes/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getFeaturedDish(): Observable<Dish> {
      // query parameter
      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }*/


  // of
  /*getDishes(): Promise<Dish[]> {
    return of(DISHES).toPromise();
  }

  getDish(id: number): Promise<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).toPromise();
  }

  getFeaturedDish(): Promise<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  }
  
  getDishIds(): Observable<number[] | any> {
    //map takes each dish.id from DISHES array and we can map dish.id into dish
    //and then construct another array and then return that modified array
    return of(DISHES.map(dish => dish.id ));
  }*/


  //Promises
  /*getDishes(): Promise<Dish[]> {
    return new Promise(resolve => { () => resolve(DISHES); });
  }

  getDishes(): Promise<Dish[]> {
    return new Promise((resolve, reject) => {
       () => resolve(DISHES); 
       () => reject(err.message);
      });
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve=> {() => resolve(DISHES.filter((dish) => (dish.id === id))[0]);});
  }

  getFeaturedDish(): Promise<Dish> {
    return  new Promise(resolve=> {() => resolve(DISHES.filter((dish) => dish.featured)[0]);});
  }*/


  //Promises 1st version
  /*getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }*/


  // 1st version
  /*getDishes(): Dish[] {
    return DISHES;
  }
  
  getDish(id: string): Dish {
    // DISHES: have to return something from DISHES. Filter: js way of filtering. [0] return type in an array.
    // => ts shorthanded way of writing a function. 
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }*/
}
