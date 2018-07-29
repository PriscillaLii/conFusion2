import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutusComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];