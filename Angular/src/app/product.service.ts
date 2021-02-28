import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Product from './Product';

@Injectable()
export default class ProductService {
  public API = 'https://localhost:44323/api';
  public PRODUCT_API = `${this.API}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.PRODUCT_API);
  }

  get(id: string) {
    return this.http.get(`${this.PRODUCT_API}/${id}`);
  }

  save(product: Product): Observable<Product> {
    let result: Observable<Product>;
    if (product.id) {
      result = this.http.put<Product>(
        `${this.PRODUCT_API}/${product.id}`,
        product
      );
    } else {
      result = this.http.post<Product>(this.PRODUCT_API, product);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.PRODUCT_API}/${id}`);
  }
}