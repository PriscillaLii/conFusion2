import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    // Now, the RouterModule takes as a parameter for the forRoot,
    // The parameter is the routes configuration
    RouterModule.forRoot(routes)
  ],

  // we want to be able to export the RouterModule to our app-module so that it can also make use of it. 
  // So this is where we make use of the export property in our NgModule decorator.
  // And make our RouterModule available for the AppModule
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
