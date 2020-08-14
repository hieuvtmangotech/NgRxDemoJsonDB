import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Store, select } from '@ngrx/store';
import { ProductState } from '../store/product.reducer';
import { Product } from '../models/product.model';
import * as fromActionProduct from '../store/product.actions';
import { selectedProduct } from '../store/product.selectors';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>
  constructor(private route: ActivatedRoute,
    private store: Store<ProductState>) { }

  ngOnInit() {
    this.store.dispatch(
      fromActionProduct.loadProduct({ id: this.route.snapshot.paramMap.get("id") }));
    this.product$ = this.store.pipe(select(selectedProduct));
  }

}
