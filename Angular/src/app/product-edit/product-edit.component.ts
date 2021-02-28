import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import ProductService from '../product.service';
import Product from '../Product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit, OnDestroy {
  product: Product = new Product();
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  //On initialization, grab product from params (product to be editted) and set this.product with it so we can reference it within the component
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.get(id).subscribe((product: any) => {
          if (product) 
            this.product = product;
        },
        (err) => {
          console.log(`Product with id '${id}' not found, returning to list`); 
          //return to list
            this.gotoList(true);
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList(error?) {
      this.router.navigate(['/api/products'], { queryParams: { displayError: error } });
      console.log(error);
  }

  save(form: any) {
    this.productService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}