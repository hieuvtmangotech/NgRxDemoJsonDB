import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import {  of } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './../services/productservice.service';
import * as fromProductAction from './product.actions';


@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductAction.loadProducts),
      mergeMap(action =>
        this.productService.getProducts()
          .pipe(
            map(products => fromProductAction.loadProductsSuccess({ products })),
            catchError((error =>
              of(fromProductAction.loadProductsFailure({ error })))
            ))
      )
    )
  );

  loadProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromProductAction.loadProduct),
    mergeMap(action =>
      this.productService.getProduct(action.id)
        .pipe(
          map(product => fromProductAction.loadProductSuccess({selectedProduct: product })),
          catchError((error =>
            of(fromProductAction.loadProductFailure({ error })))
          ))
    )
  )
);


  constructor(private actions$: Actions,
    private productService: ProductService,
    private router: Router) { }

}
