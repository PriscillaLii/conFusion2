import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish'
import { Comment } from '../shared/comment'
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

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
    private fb: FormBuilder) { 
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
    /*const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe(dish => this.dish = dish);*/
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.pipe(
      switchMap( (params: Params) => this.dishservice.getDish(+params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: number){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.commentOb = this.commentForm.value;
    var d = new Date().toISOString();
    this.commentOb.date = d;
    this.dish.comments.push(this.commentOb);
    console.log(this.commentOb);
    this.commentForm.reset({
      rating: 5,
      comment: '',
      name: '',
      Time: 'None'
    });
    console.log(this.commentForm.value);
    this.commentFormDirective.resetForm();
  }
}
