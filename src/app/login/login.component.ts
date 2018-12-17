import { Component, OnInit } from '@angular/core';
// the component that supports the dialogue component in Angular material
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username:'', password:'', remember:false};

  // MatDialogueRef will take the corresponding component.
  constructor(private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit(){
    // MatDialogueRef act like this login component
    this.dialogRef.close();
  }
  
}
