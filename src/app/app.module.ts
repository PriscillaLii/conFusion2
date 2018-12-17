import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
// @angular.material module: design the UI layout , somewhat like bootstrap
// in order to use angular.material, we also need angular.cdk and angular.animations
// layout component can be used in designing new templates. This one: CSS flex layout
import { FlexLayoutModule } from '@angular/flex-layout';
//
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// support dialog
import { MatDialogModule } from '@angular/material/dialog';
// FormsModule is the one that supports template-driven forms
import { FormsModule } from '@angular/forms'; 
// MatFormFieldModule enables us to group together a bunch of items into a form field
import { MatFormFieldModule } from '@angular/material/form-field';
// MatInputModule supports the input component which is a stylized Angular Material component 
// that supports the input form field from HTML forms 
// enables us to create an input field 
import { MatInputModule } from '@angular/material/input';
// Checkbox
import { MatCheckboxModule } from '@angular/material/checkbox';
// select module allows us to use the select element
import { MatSelectModule } from '@angular/material/select';
// SlideToggle enables us to use the slide toggle in our form
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// support reactive forms
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
// spinner used in case when promises are not resolved yet
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpModule } from '@angular/http';
//Angular supports HTTP through the Angular HTTP client
import { HttpClientModule } from '@angular/common/http';

// supporting gestures
import 'hammerjs';
import { MatListModule } from '@angular/material/list';
// router
import { AppRoutingModule } from './app-routing/app-routing.module'

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';

// we will declare this DishService as a provider.
import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { baseURL } from './shared/baseurl';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  // decorator. A function that modifies JS classes
  // NgModule: decorator that enables you to specity some details about this app module
  // It takes certain set of metadata to help you describe
  declarations: [
    // declares the view classes that belong to this particular module
    // so the view class in case of an Angular module would be in the form of either components, derectives, or pipes  
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutusComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    // all the modules need to be used in this app module
    // app module now depends upon these other modules
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    HttpModule,
    HttpClientModule,
    // for all RestangularModule used in this app, enable settings in restConfig
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    // All the services that this particular module will make use of
    // service that you want to make available for all the components from part of this module.
    // The Angular's dependency injectable looks at this information that we have declared here 
    // and then decides that it needs to create a DishService and injects it wherever it is required. 
    DishService,
    PromotionService,
    LeaderService,
    {provide: 'BaseURL', useValue: baseURL},
    ProcessHTTPMsgService
   ],
   // in order to turn a Angular component into a dialog component, we also need to declare that component as an entry component.
   // this will enable us to use the login component as an overlay on top of the current screen
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]// To bootstrap this angular app, we need to bootstrap the AppComponent, which is the root component
})
export class AppModule { } 
// Export it so that it can be used by another module
// it's root module so nothing in export
