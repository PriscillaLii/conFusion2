import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Params gives me access to the router param that are available when I come in
//  ActivatedRoute service provides me with access to the route here
import { Params, ActivatedRoute } from '@angular/router';
// Location enables me to track the locations of my page in the history of my browser. Navigate back from dishdetail
import { Location } from '@angular/common';

import { Dish } from '../shared/dish'
import { Comment } from '../shared/comment'
import { DishService } from '../services/dish.service';
import { visibility, flyInOut } from '../animations/app.animation'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    visibility()
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  visibility = 'shown';

  commentForm: FormGroup;
  commentOb: Comment;

  formErrors = {
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'comment': {
      'required': 'Comment is required.',
      'maxlength': 'Comment cannot be more than 500 characters long.'
    },
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
  @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', [Validators.required, Validators.maxLength(500) ] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      time: 'None'
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    //this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(data?: any){
    if (!this.commentForm) {return;}
    const form = this.commentForm;

    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            this.formErrors[field] += messages[key] + '';
            console.log(field+this.formErrors[field]);
          }
        }
      }
    }
  }

  ngOnInit() {
    // when this dish component is initialized, then at this point in the ngOnInit, 
    // I can go and fetch the information about the specific dish from the Params
    /*const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe(dish => this.dish = dish);*/
    this.createForm();

    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds,
        errmess => this.errMess = <any>errmess);

    // use A.pipe(B) to read stream A, and use informations in A to execute B.
    this.route.params.pipe(
      //switchMap: transform observable params to another observable dish
      // take params as parameter and use this param to return a dish
      // and then subscribe to this dish
      switchMap( (params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      .subscribe(
        dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility='shown';},
        errmess => this.errMess = <any>errmess );
  }

  setPrevNext(dishId: number){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + 1) % this.dishIds.length];
  }

  // make use of the Location service that I've included up here. 
  // The Location service provides a method called Back that allows me to go back into the previous item in the browser history.
  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.commentOb = this.commentForm.value;
    this.commentOb.date = new Date().toISOString();
    this.dishcopy.comments.push(this.commentOb);
    // Calling save will determine whether to do PUT or POST accordingly
    // put([queryParams, headers]): Does a put to the current element
    // post(subElement, elementToPost, [queryParams, headers]): Does a POST and creates a subElement. 
    // Subelement is mandatory and is the nested resource. Element to post is the object to post to the server
    this.dishcopy.save()
      .subscribe(
        dishcopy => {this.dish = dishcopy; this.dishcopy = dishcopy},
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; }
        );
    this.commentForm.reset({
      rating: 5,
      comment: '',
      name: '',
      Time: 'None'
    });
    this.commentFormDirective.resetForm();
  }
}
