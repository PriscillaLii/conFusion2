import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000))
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getLeader(id: number): Observable<Leader> {
    return of(LEADERS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

}
