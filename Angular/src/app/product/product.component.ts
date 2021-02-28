import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ProductService from '../product.service';
import Product from '../Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {
  products: Array<Product>;
  productId: string;
  error: boolean;
  checkDelete: boolean;
  private sub : Subscription;

  onSubmit() {
     this.checkDelete = false;
     return this.productId;
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {  }

  //Calls fetchData on initialization
  ngOnInit() {
    this.fetchData();
  }

  //Calls the getAll method to refresh the data
  fetchData(){
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
    
    //Grabs param from component to determine if it should display an error
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to false if no query param provided.
        this.error = params['displayError'] || false;
      });
  }

  //Calls delete function and refreshes data on completion
  delete(id) {
    this.productService.remove(id).subscribe(() => this.fetchData());
    this.checkDelete = true;
  }
}
