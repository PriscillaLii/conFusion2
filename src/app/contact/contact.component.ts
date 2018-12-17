// ViewChild: reset the form completely in the template, 
// enable us to get access to any of the child dom elements within my template.
import { Component, OnInit, ViewChild } from '@angular/core';
// FormBuilder class allows use to create the forms within our TypeScript code 
// and then be able to tie them up with that template controls there. 
// when you want to organize FormControls together as a group and then track information about those group as a whole,
// then the FormGroup enables you to agglomerate a group of FormControls together.
// Validators: form validations
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  // refer to the feedbackForm by giving it a template variable with the name fform
  @ViewChild('fform') feedbackFormDirective;

  // This is the form model that is going to host the Reactive form
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 3 characters long.',
      'maxlength':     'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 3 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder) {
    //this.createForm();
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    // FB provides a method called Group which allows me to define a group here. 
    this.feedbackForm = this.fb.group({
      // form control elements
      firstname: ['', 
        [Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
      lastname: ['',
        [Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
      // add pattern in template file 
      telnum: [null, [Validators.required, Validators.pattern] ],
      // need to add in a attribute called email to the input in template file
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    // Angular provides valueChange observable to moniter changes
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //reset form validation messages
  }

  // ?: param is optional
  // this function is used as validator
  onValueChanged(data?: any){
    if (!this.feedbackForm) {return;}
    const form = this.feedbackForm;

    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        // if formErrors contains any former messages, clear them.
        // also, with no params, all messages in formErrors will be cleared
        this.formErrors[field] = '';
        // form control
        const control = form.get(field);
        if (control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            console.log(key);
            this.formErrors[field] += messages[key] + '';
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    if (this.feedback.agree === null){
      this.feedback.agree = false;
    }
    console.log(this.feedback);
    // reset the feedbackForm Object itself
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: null,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    // ensure that my feedbackForm is completely reset to its pristine value at this point
    this.feedbackFormDirective.resetForm();
  }

}
