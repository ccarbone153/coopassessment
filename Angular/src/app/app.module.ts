import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import ProductService from './product.service';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import MyHttpInterceptor from './MyHttpInterceptor';

const appRoutes: Routes = [
  { path: '', redirectTo: 'api/products', pathMatch: 'full' },
  {
    path: 'api/products',
    component: ProductComponent
  },
  {
    path: 'product-add',
    component: ProductAddComponent
  },
  {
   path: 'product-edit/:id',
   component: ProductEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductEditComponent,
    ProductAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
