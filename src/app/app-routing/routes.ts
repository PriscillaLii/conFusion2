// to constract routes
import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  // when my URL includes home, then I will be navigating to the HomeComponent. 
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  // :id: a router param, pass that id into dishdetail component
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutusComponent },
  // when you navigate without providing a URL path there, then you would automatically navigate to the HomeComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];