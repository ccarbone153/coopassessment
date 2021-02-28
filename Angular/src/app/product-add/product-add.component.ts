import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import ProductService from '../product.service';
import Product from '../Product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  product: Product = new Product();
  sub: Subscription;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  //Navigates back to main page
  gotoList() {
    this.router.navigate(['/api/products']);
  }

  //Calls save function which saves the form to db
  save(form: any) {
    this.productService.save(form).subscribe(
      result => {
        //return to main page
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}