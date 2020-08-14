import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './../models/product.model';
import { ProductService } from './../services/productservice.service';

import { ProductState} from './../store/product.reducer';
import { selectProducts } from '../store/product.selectors';
import { Store, select } from '@ngrx/store';
import * as fromProductAction from '../store/product.actions'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
              private router: Router,
              private store: Store<ProductState>) { }

  ngOnInit(){
    this.store.dispatch(fromProductAction.loadProducts());
    this.loadProducts();
  }
  loadProducts() {
    this.products$ = this.store.pipe(select(selectProducts));
  }
}
