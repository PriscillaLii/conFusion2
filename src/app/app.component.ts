// This file supports the root component

//enable us to define a component decorator and apply it to out class
import { Component } from '@angular/core'; 

// this component class is appended with a decorator here
// component decorator: internally take a JS object(AppComponent) as a parameter
// decorator specify the metadata
@Component({
  // selector: to specify where the view corresponding to this component should be displayed in the browser
  selector: 'app-root',
  // contains the template corresponding to this particular component
  // another approach: inline
  // template: '<h1>{{title}}</h1>'
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// export: make this component class portable in another module/component
export class AppComponent {
  // define properties and methods here and can be used in template, called property binding
  // also, there is an event binding from template to component
  // if any events are generated in template, like ng-click, can trigger calls to methods inside this code
  title = 'app works!';
}
