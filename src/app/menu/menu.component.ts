import { Component, OnInit, Inject } from '@angular/core';

// so that I can use Dish as a type for a variable that I am defining here
import { Dish } from '../shared/dish';

// instead of tying in the information directly into your component, 
// you should rather let a service fetch that information for you
import {DishService} from '../services/dish.service';
import { flyInOut } from '../animations/app.animation'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;
  //selectedDish: Dish;

  // inject services: private dishService: DishService
  // inject value: @Inject('BaseURL') private BaseURL
  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  // inside this ngOnInit method, you can now ask the service to fetch this information.
  // This life cycle method will be executed by the Angular framework whenever this component is instantiated.
  // So whenever this component gets created, this method is going to be executed
  // So when that method is executed, then at that point I can go and fetch the dishes from the dishService
  ngOnInit() {
    // before Promise:
    // this.dishes = this.dishService.getDishes();

    // Promise:
    /*this.dishService.getDishes()
    .then(dishes => this.dishes = dishes);*/
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes, errmess => this.errMess = <any>errmess);
  }

  // replaced by router
  /*onSelect(dish: Dish) {
    this.selectedDish = dish;
  } */

}
