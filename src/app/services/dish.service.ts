import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
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
  constructor(private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    //return of(DISHES).pipe(delay(10));
    //HTTP
    /*return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));*/
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
    /*return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));*/
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(10));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true}).pipe(map(dishes => dishes[0]));
    /*return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));*/
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(10));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
    //return of(DISHES.map(dish => dish.id ));
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
