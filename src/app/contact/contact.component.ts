import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: [null, Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: '',
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    if (this.feedback.agree === null){
      this.feedback.agree = false;
    }
    console.log(this.feedback);
    console.log(this.feedback.agree);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: null,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }

}
