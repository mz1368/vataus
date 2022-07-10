import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
ChangeNet,ChangeVat,ChangeGross, VatSuccess, VatFailure
} from './vat.actions';
import { CalculatorService } from '../../shared/calculator.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectVat } from './vat.selectors';
import { AppState } from '../app.state';

@Injectable()
export class VatEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private calculatorService: CalculatorService
  ) {}

  // Run this code when a ChangeNet action is dispatched
  calculateNet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeNet),
      withLatestFrom(this.store.select(selectVat)),
      switchMap(([vat]) =>
        from(this.calculatorService.calculateByNet(vat.net,vat.vatRate)).pipe(
          map((res) => VatSuccess({net:res.net, vat:res.vat,gross:res.gross})),
          catchError((error) =>of(VatFailure({ error })))
        )
      )
    )
  );
  calculateVat$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ChangeVat),
    withLatestFrom(this.store.select(selectVat)),
    switchMap(([vat]) =>
      from(this.calculatorService.calculateByVat(vat.vat,vat.vatRate)).pipe(
        map((res) => VatSuccess({net:res.net, vat:res.vat,gross:res.gross})),
        catchError((error) => of(VatFailure({ error })))
      )
    )
  )
);
calculateGross$ = createEffect(() =>
this.actions$.pipe(
  ofType(ChangeGross),
  withLatestFrom(this.store.select(selectVat)),
  switchMap(([vat]) =>
    from(this.calculatorService.calculateByGross(vat.gross,vat.vatRate)).pipe(
      map((res) => VatSuccess({net:res.net, vat:res.vat,gross:res.gross})),
      catchError((error) => of(VatFailure({ error })))
    )
  )
)
);


}