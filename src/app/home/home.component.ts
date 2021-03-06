import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service' 
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {
  
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  // make them available for our applications
  constructor(private dishservice: DishService, 
    private promoservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess.message);
      /*.then(dish => this.dish = dish); */
    this.promoservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.dishErrMess = <any>errmess.message);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.dishErrMess = <any>errmess.message);
  }

}
